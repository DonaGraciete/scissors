function blockForm (form) {
	form.prop("disabled", true);
};

function enableForm (element) {
	form.prop("disabled", false);
};

//Por defeito, os erros sao escondidos
$("#login-error").hide();
$("#register-error").hide();

var options = {
	"show": "true",
	"backdrop" : "false"  //colocar a "static" quando for para nao se poder fechar
};

$("#login-modal").modal(options);

$("#create-account").click(function (event) {
	$(".login-form").addClass('hidden');
	$(".register-form").removeClass('hidden');
});

$("#switch-to-sign-in").click(function (event) {
	$(".register-form").addClass('hidden');
	$(".login-form").removeClass('hidden');
});

$("#form-signin").submit(function(event){
	blockForm($(this));
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
				$("#login-error-message").text("User credentials incorrect");
				$("#login-error").show();
			}
		},
		error: function(xhr, tetStatus, errorThrown){
			if (xhr.responseText == '') {
				$("#login-error-message").html("<strong>Sorry, an error happened.</strong> Check your internet connection.");
				$("#login-error").show();
			}
			else {
				$("#register-error-message").text("<strong>Sorry, an error happened.</strong>, an error happened: "+ xhr.responseText);
				$("#register-error").show();
			};
		}
	});

});

$("#form-signup").submit(function(event){
	event.preventDefault();
	
	var loginUsername = $("input[name=username-signup]").val();
	var loginPassword = $("input[name=password-signup]").val();
	var loginConfirm = $("input[name=password-confirm]").val();

	if(loginPassword != loginConfirm){
		$("#register-error-message").html("<strong>Error:</strong> Passwords don't match.");
		$("#register-error").show();
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
				$("#register-error-message").text("<strong>Error:</strong> Username already taken");
				$("#register-error").show();
			}
		},
		error: function(xhr, tetStatus, errorThrown){
			alert("entrei")
			if (xhr.responseText == '') {
				$("#register-error-message").html("<strong>Sorry, an error happened.</strong> Check your internet connection.");
				$("#register-error").show();
			}
			else {
				$("#register-error-message").text("<strong>Sorry, an error happened.</strong>, an error happened: "+ xhr.responseText);
				$("#register-error").show();
			};
		}
	});

});