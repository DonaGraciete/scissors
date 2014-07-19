//var url = 'https://lxreactor-c9-seuqaj114.c9.io/api/login?'
var url = "http://localhost:3000/api/"

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

	var username = $("input[name=username-signin]").val();
	var password = $("input[name=password-signin]").val();

	JSONdata = JSON.stringify({
		username:username,
		password:password
	});

	$.ajax({
		url: url+"login",
		type: "POST",
		data: JSONdata,
		datatype : "json",
    	contentType: "application/json; charset=utf-8",
		success: function(data){
			console.log("success");
			if(data.result == true){
				window.location.replace("index.html");
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
	
	var username = $("input[name=username-signup]").val();
	var password = $("input[name=password-signup]").val();
	var confirm = $("input[name=password-confirm]").val();

	if(password != confirm){
		$("#error-message").text("Passwords don't match");
		return;
	}

	JSONdata = JSON.stringify({
		username:username,
		password:password
	});

	$.ajax({
		url: url+"register",
		type: "POST",
		data: JSONdata,
		datatype : "json",
    	contentType: "application/json; charset=utf-8",
		success: function(data){
			console.log("success");
			if(data.result == true){
				window.location.replace("index.html");
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