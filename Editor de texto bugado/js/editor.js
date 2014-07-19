var editor = $("#text-box");

function formatText(cmd, val) {
    // Executes execCommand and passes focus back to the editor

    editor.focus();
    //alert("chegou antes");
    document.execCommand(cmd, false, val);
    //alert("chegou depois");
    editor.focus();
}

function getCmd(str) {

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

	$("a").click(function() {

		editor.focus();

		var val = $(this).attr("id");
		var $parentId = $(this).parent().parent().attr("id");
		var cmd = getCmd($parentId);

		//alert("parentId: " + $parentId + " " + typeof($parentId));
		//alert("cmd: " + cmd + " " + typeof(cmd));
		//alert("val: " + val + " " + typeof(val));

		formatText(cmd, val);
	});

	$("button").click(function() {

		editor.focus();

		var cmd = $(this).attr("value");

		if ( cmd == undefined ) {
			editor.focus();
		}
		else {
			formatText(cmd);
		}
	});
});






