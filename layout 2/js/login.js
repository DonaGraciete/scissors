var options = {
	"show": "true",
	"backdrop" : "false"
};

$("#login-modal").modal(options);

$("#create-account").click(function (event) {
	$(".login-form").addClass('hidden');
	$(".register-form").removeClass('hidden');
	$("#error-message").text("");
});

$("#switch-to-sign-in").click(function (event) {
	$(".register-form").addClass('hidden');
	$(".login-form").removeClass('hidden');
	$("#error-message").text("");
});

$("#form-signin").submit(function(event){
	event.preventDefault();

	var loginUsername = $("input[name=username-signin]").val();
	var loginPassword = $("input[name=password-signin]").val();

	JSONdata = JSON.stringify({
		username:loginUsername,
		password:loginPassword
	});

	$.ajax({
		url: apiUrl+"login",
		type: "POST",
		data: JSONdata,
		datatype : "json",
    	contentType: "application/json; charset=utf-8",
		success: function(data){
			console.log("success");
			if(data.result == true){
				username = loginUsername;
				$("#login-modal").modal("hide");
				webSocketConnect();
			}
			else{
				console.log("informacao errada");
				$("#error-message").text("User credentials incorrect");
			}
		},
		error: function(xhr, tetStatus, errorThrown){
			$("#error-message").text("Sorry, an error happened: "+xhr.responseText);
		}
	});

});

$("#form-signup").submit(function(event){
	event.preventDefault();
	
	var loginUsername = $("input[name=username-signup]").val();
	var loginPassword = $("input[name=password-signup]").val();
	var loginConfirm = $("input[name=password-confirm]").val();

	if(loginPassword != loginConfirm){
		$("#error-message").text("Passwords don't match");
		return;
	}

	JSONdata = JSON.stringify({
		username:loginUsername,
		password:loginPassword
	});

	$.ajax({
		url: apiUrl+"register",
		type: "POST",
		data: JSONdata,
		datatype : "json",
    	contentType: "application/json; charset=utf-8",
		success: function(data){
			console.log("success");
			if(data.result == true){
				username = loginUsername;
				$("#login-modal").modal("hide");
				webSocketConnect();
			}
			else{
				console.log("informacao errada");
				$("#error-message").text("Username already taken");
			}
		},
		error: function(xhr, tetStatus, errorThrown){
			$("#error-message").text("Sorry, an error happened: "+xhr.responseText);
		}
	});

});