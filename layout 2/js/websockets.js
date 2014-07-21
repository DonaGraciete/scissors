function sendLoginMessage () {
	ws.send(JSON.stringify({
		type:"user-login",
		content: {
			fromId: userId,
		}
	}));
};

function sendLogOutMessage () {
	ws.send(JSON.stringify({
		type:"user-logout",
		content: {
			fromId: userId,
		}
	}));
};

function sendFileMessage (fileName, fileUsers) {
	ws.send(JSON.stringify({
		type:"new-file",
		content: {
			name: fileName,
			users: fileUsers
		}
	}));
};

function sendChatMessage (message) {
	ws.send(JSON.stringify({
		type: "chat-message",
		content: {
			chat: {message:message},
			id: fileChatInUse.id,
			users: files[fileChatInUse.index].users
		}
	}));
};

function sendChatStartMessage (id) {
	ws.send(JSON.stringify({
		type:"chat-start",
		content: {
			id: id,
			length: length
		}
	}));
}

function webSocketConnect() {
	ws = new WebSocket (url + username);
	ws.onopen = function (evt) {
		ws.onmessage = function (evt) {
			var data=JSON.parse(evt.data);
			switch (data.type) {
				case "file":
				console.log("file recieved");
				files.push(data.content);
				$("#file-list").append("<li class='list-group-item' id="+data.content._id+">" + data.content.name + "</li>");
				console.log($("#file-list li"));
				break;
				case "chat-start":
				console.log("messages recieved from file "+fileChatInUse.name+": "+data.content.messagesToAdd.length);
				var file;
				var message;
				for(var i=0;i<data.content.messagesToAdd;++i){
					file=files[fileChatInUse.index];
					file.chat.push(data.content.messagesToAdd[i]);
					message=messagesToAdd[i].message;
					$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");
				}
				break;
				case "chat-message":
				console.log("chat message recieved");

					//se a mensagem recebida for do chat activo --> adicionar à cache e ao chat UI.
					//se não for --> adicionar só à cache.

					recievedFileChatIndex = indexOfId(files,data.content.id);
					files[recievedFileChatIndex].chat.push(data.content.chat);
					
					if(recievedFileChatIndex == fileChatInUse.index){
						var message = data.content.chat.message;
						$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");
					}

					break;
					case "my-info":
					//var userId = data.content.id; //INCOMPLETO
					//console.log(user);
					break;
					case "user-login":
					alert("user "+data.content.username+" just logged in");
				//var new_user = $("<li>").addClass("logged-users-" + data.content.fromId).append("User " + data.content.fromId);
				//$("#user-list").append(new_user);
				break;
				/*
				case "message": 		
				$("#text-editor").contents().find("body").html(evt.data.content.text);
				break;
				case "user-logout":
				console.log(".logged-users " + String(data.content.fromId));
				$(".logged-users-" + String(data.content.fromId)).fadeOut(600);
				break;*/

			};
		};
	};

	ws.onclose = function (evt) {
		/*ws.send(
			JSON.stringify(
			{
				type:"user-logout",
				content: {
					fromId: userId,
				}
			}
			)
			);*/

	};
};

$("#reconnect").click(function () {
	webSocketConnect();
});

var ws;
webSocketConnect();