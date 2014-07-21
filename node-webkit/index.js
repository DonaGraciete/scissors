var username = "jaques";
var userId;
var files = [];
var fileChatInUse={};
//url = "ws://lxreactor-c9-seuqaj114.c9.io/"

function indexOfId(array,id){
	for(var i=0;i<array.length;++i){
		if(array[i]._id == id){
			return i;
		}
	}
	return -1;
}

var url = "ws://localhost:3000/";

//WEBSOCKETS
var ws;
webSocketConnect();

function webSocketConnect() {
	ws = new WebSocket (url + username);
	ws.onopen = function (evt) {
		$("#websocket-success").fadeIn(600);
		$("#websocket-failed").fadeOut(600);
		ws.onmessage = function (evt) {
			var data=JSON.parse(evt.data);
			switch (data.type) {
				case "file":
					console.log("file recieved");
					files.push(data.content);
					$("#file-list").append("<li id="+data.content._id+">" + data.content.name + "</li>");
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
			);
		*/
		$("#websocket-success").fadeOut(600);
		$("#websocket-failed").fadeIn(600);
	}
};

$("#reconnect").click(function () {
	webSocketConnect();
});

//CREATE NEW FILE
$("#project-submit").click(function (event){
	event.preventDefault();

	var fileName = $("input[name=project-name]").val();
	var fileUsers = $("input[name=project-users]").val().split(" ");
	fileUsers.push(username);

	ws.send(JSON.stringify({
		type:"new-file",
		content: {
			name: fileName,
			users: fileUsers
		}
	}));

});


//CHAT

$("#file-list").click(function(event){
	console.log(event.target.id+" clicked");

	var index = indexOfId(files,event.target.id);
	console.log("index: "+index);
	var file = files[index];
	console.log("file's chat: "+file.chat);

	//define current file's cache
	fileChatInUse.index = index;
	fileChatInUse.name = file.name;
	fileChatInUse.id = file._id;

	//add existing messages
	for(var i=0;i<file.chat.length;++i){
		var message = file.chat[i].message;
		$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");
		console.log("added existing message to chat");
	}


	//get newest messages
	var length = file.chat.length;
	console.log("file's length: "+length);

	ws.send(JSON.stringify({
		type:"chat-start",
		content: {
			id: event.target.id,
			length: length
		}
	}));
});

$("#chat-input-text").keypress(function(event) {
	if(event.keyCode==13) {
		event.preventDefault();
		var message=$(this).val();
		if (message != '') {
			//PASSAR ISTO PARA UMA FUNÇÃO

			//$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");

			ws.send(JSON.stringify({
				type: "chat-message",
				content: {
					chat: {message:message},
					id: fileChatInUse.id,
					users: files[fileChatInUse.index].users
				}
			}));

			$(this).val('');
		}
	}
});

$("#chat-send").click(function(event) {
	var e = $.Event('keypress');
	e.keyCode = 13; // enter
	$("#chat-input-text").trigger(e);
});




//EDITOR DE TEXTO

//Activa escrita no iframe
document.getElementById("text-editor").contentWindow.document.designMode="on";

$("#text-editor").contents().find("body").keyup(function(event) {
	ws.send(
		JSON.stringify(
		{
			type:"message",
			content: {
				text: $(this).html()
			}
		}
		)
		);
});

//Aplica bold
$("#bold").click(function() {
	var editor = document.getElementById("text-editor").contentWindow;
	
	editor.focus();
	editor.document.execCommand("bold", false, "");
	editor.focus();
	
	ws.onopen = function(evt) {
		ws.send(JSON.stringify({toId: toId,
			text: $("#text-editor").contents().find("body").html()}));
	};
});

//Aplica italico
$("#italic").click(function() {
	var editor = document.getElementById("text-editor").contentWindow;

	editor.focus();
	editor.document.execCommand("italic", false, "");
	editor.focus();
	
	ws.onopen = function(evt) {
		ws.send(JSON.stringify({toId: toId,
			text: $("#text-editor").contents().find("body").html()}));
	};
});


