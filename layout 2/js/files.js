//	Activate modal for file creation
$("#new-file-button").click(function(){
	var options = {
		"show": "true",
		"backdrop" : "true"
	};

	$("#new-file-modal").modal(options);
});

//	Create new file
$("#create-new-file-button").click(function (event){
	event.preventDefault();

	var fileName = $("input[name=file-name]").val();
	var fileUsers = $("input[name=file-users]").val().split(" ");
	fileUsers.push(username);

	$("input[name=file-name]").val("");
	$("input[name=file-users]").val("");

	$("#new-file-modal").modal("hide");	

	sendFileMessage(fileName, fileUsers, username);

});

$("#delete-file").click(function() {
	var permission = $("#middle-editor-row").attr('contenteditable');

	if(permission == 'true') {
		var option = confirm("Are you sure you want to delete " + fileChatInUse.name + "?")
		if (option) {
			sendDeleteFileMessage();
		};
	}

	else {
		alert("Error! You currently don't have writing privileges in this file.")
	}
});