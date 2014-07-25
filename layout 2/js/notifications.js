PNotify.prototype.options.styling = "fontawesome";

function webSocketOpenNotification () {
	PNotify.removeAll();

	$(function(){
		var notice = new PNotify({
			title: 'Success!',
			text: 'Websocket connection was established.',
			type: 'success',
			shadow: false,
			buttons: {
				sticker: false
			},
			mouse_reset: false
		});

		notice.get().click(function() {
			notice.remove();
		});
	});
};

function webSocketClosedNotification () {
	PNotify.removeAll();

	$(function(){
		var notice = new PNotify({
			title: 'Darn it!',
			text: 'Websocket connection was lost. Click me to reconnect.',
			type: 'error',
			hide: false,
			shadow: false,
			buttons: {
				closer: false,
				sticker: false
			},
			mouse_reset: false,
		});

		notice.get().click(function() {	
			notice.update({
				title: "Let's try that again." ,
				text:('Attempting to reconnect...')
			});

			webSocketConnect();
			
		});
	});
};

function savedFileNotification () {
	$(function(){
		var notice = new PNotify({
			title: 'Success!',
			text: 'File saved',
			type: 'success',
			buttons: {
				sticker: false
			},
			mouse_reset: false
		});

		notice.get().click(function() {
			notice.remove();
		});
	});

};

function deletedFileNotification (deletedFileName) {
	$(function(){
		var notice = new PNotify({
			title: 'File deleted',
			text: 'File '+deletedFileName+' has just been deleted',
			type: 'info',
			buttons: {
				sticker: false
			},
			mouse_reset: false
		});

		notice.get().click(function() {
			notice.remove();
		});
	});

};

