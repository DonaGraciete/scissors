var editor = $("#middle-editor-row");

function formatText(cmd, val) {
    // Executes execCommand and passes focus back to the editor

        editor.focus();
        document.execCommand(cmd, false, val);
        editor.focus();
}

function getCmd(str) {
	// Gets right execCommand

	if ( str == "text-type" ) {
		return "formatblock";
	}
	else if ( str == "font-family" ) {
		return "fontname";
	}
	else if ( str == "font-size" ) {
		return "fontsize";
	}
	else if ( str == "font-color" ) {
		return "foreColor";
	}
	else if ( str == "highlight-color" ) {
		return "backcolor";
	}
}

$(document).ready(function() {

	$(".dropdown-menu li a").click(function() {

		var val = $(this).attr("id");
		var $parentId = $(this).parent().parent().attr("id");
		var cmd = getCmd($parentId);

		formatText(cmd, val);
	});

	$(".btn").click(function() {

		var cmd = $(this).attr("value");

		formatText(cmd);
	});
});






