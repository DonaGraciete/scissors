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

function launch_modal(mod, op1, op2) {
	var options = {
		"show": "true",
		"backdrop" : "true"
	};

	mod.modal(options);
}


$(document).ready(function() {

	$("#editor-toolbar .dropdown-menu li a").click(function() {
		
		var val = $(this).attr("id");
		var $parentId = $(this).parent().parent().attr("id");
		var cmd = getCmd($parentId);

		formatText(cmd, val);
	});

	$("#editor-toolbar .btn").click(function() {
		var cmd = $(this).attr("value");
		formatText(cmd);
	});

	$("#insert-link").click(function() {

		$("#insert-link").toggleClass("active");

		if( $("#insert-link").hasClass("active") ) {

			if( window.getSelection() ) {
				launch_modal( $("#insert-link-modal") );
			}
			else { //create a link - modal

			}

		}
		else { // unlink

		}


	});
});