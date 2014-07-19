function sendLoginMessage (ws, userId) {
	ws.send(JSON.stringify({
		type:"user-login",
		content: {
			fromId: userId,
		}
	}));
};

function sendLogOutMessage (ws, userId) {
	ws.send(JSON.stringify({
		type:"user-logout",
		content: {
			fromId: userId,
		}
	}));
};

function sendNewProjectMessage (ws) {
	ws.send(JSON.stringify({
			type:"new-project",
			content: {
				name: projectName,
				users: projectUsers
			}
		}));
};

/*function sendTextMessage (ws) {
	ws.send(JSON.stringify({
			type:"new-project",
			content: {
				name: projectName,
				users: projectUsers
			}
		}));
};*/