var editor = $("#middle-editor-row");
var options = {
	"show": "true",
	"backdrop" : "true"
};

var changeEvents = 0;

$("#middle-editor-row").bind("DOMSubtreeModified",function(ret){
	console.log("editor content changed");
	changeEvents+=1;
});

setInterval(function(){
	if(changeEvents != 0 && $("#middle-editor-row").attr("contenteditable")=="true"){
		sendTextFile(fileChatInUse.id);
		files[fileChatInUse.index].text = $("#middle-editor-row").html();
		changeEvents = 0;
	}
},100);

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
	else if ( str == "tab") {
		return "insertHTML";
	}
	else if ( str == "link" ) {
		return "createLink";
	}
	else if ( str == "image" ) {
		return "insertImage";
	}
}

function saveSelection() {
	if (window.getSelection) {
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			var ranges = [];
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				ranges.push(sel.getRangeAt(i));
			}
			return ranges;
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange();
	}
	return null;
}

function restoreSelection(savedSel) {
	if (savedSel) {
		if (window.getSelection) {
			sel = window.getSelection();
			sel.removeAllRanges();
			for (var i = 0, len = savedSel.length; i < len; ++i) {
				sel.addRange(savedSel[i]);
			}
		} else if (document.selection && savedSel.select) {
			savedSel.select();
		}
	}
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

		if ( $("#insert-link").hasClass("active") ) {
			var cmd = getCmd("link");

			if ( document.getSelection() ) {
				var savedSel = saveSelection();

				$("#link-displayed-text").val( savedSel );
				$("#insert-link-modal").modal( options );

				$("#create-link").click(function() {
					var url = $("#link-url").val();
					restoreSelection( savedSel );
					formatText(cmd, url);
					$("#insert-link-modal").modal("hide");
				});
			}
			else { //create a link - modal


			}

		}
		else { // unlink

		}
	});

	$("#insert-picture").click(function() {
		$("#insert-picture-modal").modal(options);

		$("#create-picture").click(function() {
			var cmd = getCmd("image");

			$("#insert-picture-modal").modal("hide");

			if ( $("#image-path").val() ) {
				var url = $("#image-path").val();
			}
			else {
				var url = $("#picture-url").val();
			}

			formatText(cmd, url);

			$("#image-path").val("");
			$("#picture-url").val("");
		});
	});

	editor.keydown(function(event) {
		//When user presses tab while writing it writes a paragraph
		//instead of changing html element

		if (event.keyCode == 9) {
			event.preventDefault();
			var cmd = getCmd("tab");
			formatText(cmd, "&emsp;");
		}
	});
});

    









