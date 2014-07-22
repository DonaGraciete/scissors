$("#new-pdf-button").click(function() {
	alert($('#middle-editor-row').html());
	generatePDF();
});

function generatePDF() {
	var pdf = new jsPDF('p', 'pt', 'letter');

	source = $('#middle-editor-row').html();

	specialElementHandlers = {
		'#bypassme': function(element, renderer) {
			return true
		}
	};
	margins = {
		top: 80,
		bottom: 60,
		left: 40,
		width: 522
	};

	pdf.fromHTML(
		source, 
		margins.left, 
		margins.top, {
			'width': margins.width, 
			'elementHandlers': specialElementHandlers
		},
		function(dispose) {
			pdf.save('Test.pdf');
		}
		, margins);
}