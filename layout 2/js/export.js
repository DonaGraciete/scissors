//var wkhtmltopdf = require('wkhtmltopdf');

//	Activate modal for file creation
$("#export-file-button").click(function(){
	var options = {
		"show": "true",
		"backdrop" : "true"
	};

	$("#export-file-modal").modal(options);
});

$("#form-export").submit(function(event){
	event.preventDefault();
	$('#export-file-modal').modal('hide');

	var filename  = $("#form-export input[name='filename']").val();
	var format = $("#form-export input[type='radio']:checked").val();
	var content = $("#middle-editor-row").html();

	switch(format) {
		case "pdf":
			generatePDF(content, filename);
			break;
		case "html":
			generateHTML(content, filename);
			break;
		default:
			break;
	};
});

function generatePDF(content, filename) {
	wkhtmltopdf(content, { output: filename +'.pdf' });
	savedFileNotification();
};

function generateHTML(content, filename) {
	alert("HTML is not currently supported :(")
};