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

function sendFileMessage (fileName, fileUsers, creator) {
	ws.send(JSON.stringify({
		type:"new-file",
		content: {
			name: fileName,
			users: fileUsers
		},
		creator: creator
	}));
};

function sendChatMessage (message) {
	ws.send(JSON.stringify({
		type: "chat-message",
		content: {
			chat: {
				message:message,
				username:username
			},
			id: fileChatInUse.id,
			users: files[fileChatInUse.index].users
		}
	}));
};

function sendChatStartMessage (id,length) {
	ws.send(JSON.stringify({
		type:"chat-start",
		content: {
			id: id,
			length: length
		}
	}));
}

function sendUsingFileMessage(id){
	ws.send(JSON.stringify({
		type:"file-using",
		content:{
			id: id
		}
	}));
}

function sendDismissFileMessage(id){
	ws.send(JSON.stringify({
		type:"file-dismiss",
		content:{
			id: id
		}
	}));
}

function sendDeleteFileMessage(){
	ws.send(JSON.stringify({
		type:"file-delete",
		content:{
			id: fileChatInUse.id
		}
	}));
}

function sendTextFile(id){
	
	//	Get editor's text
	var text = $("#middle-editor-row").html();

	ws.send(JSON.stringify({
		type: "file-text",
		content:{
			id:id,
			text:text
		}
	}));
}



function webSocketConnect() {
	ws = new WebSocket (url + username);
	
	//	Clean file list and chat
	$("#file-list").empty();
	$("#chat-messages").empty();
	

	ws.onopen = function (evt) {
		webSocketOpenNotification();

		ws.onmessage = function (evt) {
			var data=JSON.parse(evt.data);
			switch (data.type) {
				case "file":

					console.log("file recieved");
					files.push(data.content);

					if(data.content.using){
						$("#file-list").append("<li class='list-group-item' id="+data.content._id+">" + data.content.name +
							"<span class='label label-default pull-right'>"+data.content.using+"</span>"+
							"</li>");
					}
					else
						$("#file-list").append("<li class='list-group-item' id="+data.content._id+">" + data.content.name +"</li>");


					console.log($("#file-list li"));

					if(data.creator == username){
						console.log("i created this file");
						var e = $.Event("click");
						$("#"+data.content._id).trigger(e);
					}

					break;

				case "chat-message":

					console.log("chat message recieved");

					//se a mensagem recebida for do chat activo --> adicionar à cache e ao chat UI.
					//se não for --> adicionar só à cache.

					recievedFileChatIndex = indexOfId(files,data.content.id);
					files[recievedFileChatIndex].chat.push(data.content.chat);
					
					if(recievedFileChatIndex == fileChatInUse.index){
						$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>"+data.content.chat.username+"</strong><br/>" + data.content.chat.message + "</div>");
					}

					break;

				case "file-using":

					console.log("file using message received");

					recievedFileUsingIndex = indexOfId(files,data.content.id);
					files[recievedFileUsingIndex].using = data.content.username;

					if(data.content.username == username){
						$("#"+data.content.id).append("<span class='label label-success pull-right'>"+data.content.username+"</span>");
					}
					else{
						$("#"+data.content.id).append("<span class='label label-default pull-right'>"+data.content.username+"</span>");
					}

					break;

				case "file-dismiss":

					console.log("file dismiss message received");

					recievedFileDismissIndex = indexOfId(files,data.content.id);
					files[recievedFileDismissIndex].using = "";

					$("#"+data.content.id+" span").remove();

					break;

				case "file-text":

					console.log("file text changed");

					recievedFileTextIndex = indexOfId(files,data.content.id);
					files[recievedFileTextIndex].text = data.content.text;

					//	If file being focused but not used
					if(data.content.id == fileChatInUse.id){
						$("#middle-editor-row").html(data.content.text);
					}

					break;

				case "file-delete":

					console.log("file deleted");

					fileToDeleteIndex = indexOfId(files,data.content.id);
					var deletedFileName = files[fileToDeleteIndex].name;

					//	Delete file in cache
					files.splice(fileToDeleteIndex,1);

					//	Remove file from list
					$("#"+data.content.id).remove();

					//	Clear current messages
					$("#chat-messages").empty();

					//	If file being focused (used or not)
					if(data.content.id == fileChatInUse.id){
						$("#middle-editor-row").html("");
						$("#middle-editor-row").attr("contenteditable","false");
						fileChatInUse.index = null;
						fileChatInUse.name = null;
						fileChatInUse.id = null;
					}

					deletedFileNotification(deletedFileName);

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
		webSocketClosedNotification();
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

var ws;
//webSocketConnect();