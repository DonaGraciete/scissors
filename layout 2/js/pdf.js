var wkhtmltopdf = require('wkhtmltopdf');

$("#new-pdf-button").click(function() {
	generatePDF($('#middle-editor-row').html());
});

function generatePDF(content) {
	wkhtmltopdf(content, { output: 'out.pdf' });
};