var username = "melo";
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
				case "chat-messages":
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
	var file = files[index];
	console.log(file.chat);

	//add existing messages
	for(var i=0;i<file.chat.length;++i){
		var message = file.chat[i].message;
		$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");
	}


	//get newest messages
	fileChatInUse.index = index;
	fileChatInUse.name = file.name;
	fileChatInUse.id = file._id;

	var length = file.chat.length;

	ws.send(JSON.stringify({
		type:"chat-start",
		content: {
			id: event.target.id,
			lenght: length
		}
	}));
});

$("#chat-input-text").keypress(function(event) {
	if(event.keyCode==13) {
		event.preventDefault();
		message=$(this).val();
		if (message != '') {
			//$("#chat-messages").append("<p class='sent-messages alert alert-info'> <strong>Username</strong> <br/>" + message + "</p>");
			$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");
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


