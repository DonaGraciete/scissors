//CHAT
function indexOfId(array,id){
	for(var i=0;i<array.length;++i){
		if(array[i]._id == id){
			return i;
		}
	}
	return -1;
}

$("#file-list").delegate("li","click",function(event){

	console.log(event.target.id+" clicked");

	var index = indexOfId(files,event.target.id);
	console.log("index: "+index);

	var file = files[index];
	console.log("file's chat: "+file.chat);

	//	Define current file's cache
	fileChatInUse.index = index;
	fileChatInUse.name = file.name;
	fileChatInUse.id = file._id;

	//	Clear current messages
	$("#chat-messages").empty();

	//	Add existing messages
	for(var i=0;i<file.chat.length;++i){
		$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>"+file.chat[i].username+"</strong><br/>" + file.chat[i].message + "</div>");
		console.log("added existing message to chat");
	}

	//	Get newest messages
	var length = file.chat.length;
	console.log("file's length: "+length);

	sendChatStartMessage(event.target.id,length);
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