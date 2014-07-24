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
