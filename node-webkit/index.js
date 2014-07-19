var username = "jaques";
var userId;
var files = [];
//url = "ws://lxreactor-c9-seuqaj114.c9.io/"

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
					$("#file-list").append("<li>"+data.content.name+"</li>");
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

//CREATE NEW PROJECT
$("#project-submit").click(function (event) {
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

//CHAT

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
	e = $.Event('keypress');
	e.keyCode = 13; // enter
	$("#chat-input-text").trigger(e);
})

