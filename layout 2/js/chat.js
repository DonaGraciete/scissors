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

	//	MELHORAR ESTA MERDA, FUUUUUUUUCK
	$.each($("#file-list li"), function (key, value) {
		$(this).removeClass('active');
	});

	$(this).addClass('active');

	//	Check if user is clicking on his active file
	if(file.using == username){
		return;
	}

	//	SECCÇÃO ABAIXO PODE SER MELHORADA, MAS FAZ-SE DEPOIS xD
	//------------------------------------------

	//	Check if user was editing a different file
	for(var i=0;i<files.length;++i){
		
		//	If so, send message to all users to remove previous active file
		if(files[i].using == username){
			sendDismissFileMessage(files[i]._id);
		}
	}

	//-----------------------------------------

	//	Check for file already in use
	console.log("file usage: "+file.using);
	if(!file.using){
		sendUsingFileMessage(event.target.id);
		//debug this part
		$("#middle-editor-row").attr("contenteditable","true");
	}
	else{
		$("#middle-editor-row").attr("contenteditable","false");
	}

	//	Sync text
	//$("#middle-editor-row").empty();
	$("#middle-editor-row").html(file.text);

	//	Set/change current file's cache
	fileChatInUse.index = index;
	fileChatInUse.name = file.name;
	fileChatInUse.id = file._id;

	//	Clear current messages
	$("#chat-messages").empty();

	//	Add existing messages
	for(var i=0;i<file.chat.length;++i){
		$("#chat-messages").append("<div class='well well-sm'><strong>"+file.chat[i].username+"</strong><br/>" + file.chat[i].message + "</div>");
		console.log("added existing message to chat");
	}

	$("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);

});

$("#chat-input-text").keypress(function(event) {
	if(event.keyCode==13) {
		event.preventDefault();
		var message=$(this).val();
		if (message != '') {
			//$("#chat-messages").append("<div class='sent-messages well well-sm'><strong>Username</strong><br/>" + message + "</div>");

			sendChatMessage(message);

			$(this).val('');

			$("#chat-messages").scrollTop($("#chat-messages")[0].scrollHeight);
		}
	}
});

//Activa o enter para mandar mensagens
$("#chat-send").click(function(event) {
	var e = $.Event('keypress');
	e.keyCode = 13; // enter
	$("#chat-input-text").trigger(e);
});