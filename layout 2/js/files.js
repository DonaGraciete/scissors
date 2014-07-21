//Activate modal for file creation
$("#new-file-button").click(function(){
	var options = {
		"show": "true",
		"backdrop" : "true"
	};

	$("#new-file-modal").modal(options);
});

//Create new file
$("#create-new-file-button").click(function (event){
	event.preventDefault();

	var fileName = $("input[name=file-name]").val();
	var fileUsers = $("input[name=file-users]").val().split(" ");
	fileUsers.push(username);

	ws.send(JSON.stringify({
		type:"new-file",
		content: {
			name: fileName,
			users: fileUsers
		}
	}));

});