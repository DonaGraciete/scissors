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
			//$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");

			sendChatMessage(message);

			$(this).val('');
		}
	}
});

//Activa o enter para mandar mensagens
$("#chat-send").click(function(event) {
	var e = $.Event('keypress');
	e.keyCode = 13; // enter
	$("#chat-input-text").trigger(e);
});