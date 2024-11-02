const vscode = require('vscode');



function activate(context) {
	console.log('Congratulations, your extension "m-helper" is now active!');

	const disposable = vscode.commands.registerCommand('m-helper.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from m-helper!');

		const panel = vscode.window.createWebviewPanel(
			'm-help',
			"Visual Studio helper Extension",
			vscode.ViewColumn.One,
			{ enableScripts: true }
		)
		panel.webview.html = getWebviewContent();
		panel.webview.onDidReceiveMessage(
			message => {
				if (message.command === 'openLink' && message.url) {
					panel.webview.html = getWebviewContentWithURL(message.url);
				} else if (message.command === 'goBack') {
					panel.webview.html = getWebviewContent();
				} else {
					console.error('Received message with null or undefined URL');
				}
			},
			undefined,
			context.subscriptions
		);

	});

	context.subscriptions.push(disposable);
}
function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<title>VS Code Extension</title>
		<style>
		.flex-container {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    min-height: 100vh; /* Full viewport height */
    margin: 0; /* Remove default margin */
    font-family: Arial, sans-serif;
}
	

.button-container {
    display: grid; /* Use grid for button layout */
    grid-template-columns: repeat(5, 1fr); /* 5 buttons per row */
    column-gap: 10px; /* Space between columns */
    row-gap: 5px; /* Space between rows, adjust as needed */
    padding: 10px;
    gap: 20px; /* This can also be used to create space between buttons */
}
			button {
    background-color: #007acc; /* VS Code's signature blue color */
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
}

/* Hover effect */
button:hover {
    background-color: #005f99; /* Darker blue on hover */
    transform: translateY(-2px); /* Slightly raise the button */
}

/* Active effect for button press */
button:active {
    background-color: #004d80;
    transform: translateY(1px); /* Lower slightly to show press effect */
}

		</style>
	</head> 
	<body>
		<h1>Doc Opener</h1>
		<p>M-helper will help you to open doc in the vs code</p>
		<h1 id='p2'>you can open different language doc in vs code by this extension</h1>
		<div class="flex-container">
		<div class="button-container">
		<button onclick="openLink('https://docs.python.org/3/tutorial/index.html')">Python</button>
		<button onclick="openLink('https://devdocs.io/c/')">C</button>
		<button onclick="openLink('https://devdocs.io/cpp/')">C++</button>
		<button onclick="openLink('https://socket.io/docs/v4/tutorial/introduction')">Socket.IO</button>
		<button onclick="openLink('https://nodejs.org/docs/latest/api/')">Node js</button>
		<button onclick="openLink('https://react.dev/learn')">React</button>
		<button onclick="openLink('https://tailwindcss.com/docs/installation')">Tailwind css</button>
		<button onclick="openLink('https://nextjs.org/docs')">Next</button>
		<button onclick="openLink('https://www.typescriptlang.org/docs/')">Type Script</button>
		<button onclick="openLink('https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html')">Java</button>
		</div>
		</div>

		<script>
			const vscode = acquireVsCodeApi();
		
			// Send a message to open a specific URL 
			function openLink(url) {
    if (url) {
        vscode.postMessage({ command: 'openLink', url: url });
    } else {
        console.error('URL is null or undefined');
    }
}
		</script>
	</body>
	</html>`;
}


function getWebviewContentWithURL(url) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Website</title>
			<style>
			body.light-mode, body {
			background-color: white;
			color: black;
		}

		/* Dark mode styles */
		body.dark-mode {
			background-color: #121212;
			color: white;
		}

				body, html {
					 width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
				}
				iframe {
					width: 100%;
					height: 100%;
					border: none;
				}
					button {
    background-color: #005f99;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
}

/* Hover effect */
button:hover {
    background-color: #005f99; /* Darker blue on hover */
    transform: translateY(-2px); /* Slightly raise the button */
}

/* Active effect for button press */
button:active {
    background-color: #004d80;
    transform: translateY(1px); /* Lower slightly to show press effect */
}
	.button-bar {
    display: flex;
    justify-content: space-between; /* Places buttons on the left and right */
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #007acc; /* Background color for the button bar */
    box-sizing: border-box;
}

			</style>
		</head>
		<body class="light-mode">
		<div class="button-bar">
	<button id="backButton" onclick="goBack()">⬅ Back</button>
	<button id="toggleModeButton" onclick="toggleDarkMode()">Toggle Dark Mode</button>
</div>
			<iframe src="${url}"></iframe>

			<script>
				const vscode = acquireVsCodeApi();
				
				// Send message to go back to the previous view
				function goBack() {
					vscode.postMessage({ command: 'goBack' });
				}
					function toggleDarkMode() {
			document.body.classList.toggle('dark-mode');
			document.body.classList.toggle('light-mode');
		}
			</script>
		</body>
		</html>
	`;
}


// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
