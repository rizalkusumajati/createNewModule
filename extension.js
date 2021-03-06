// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "createNewModule" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('createNewModule.helloWorld', async function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var resultInbox = await showInputBox();
		let resultPackageName = resultInbox.replace("_","");
		var message = "";
		if(vscode.workspace.workspaceFolders !== undefined) {
			let wf = vscode.workspace.workspaceFolders[0].uri.path ;
			let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
			let splitPath = wf.split("/");
			

			message = `YOUR-EXTENSION: folder: ${wf} - ${f}` ;
			let packageRoot = splitPath[splitPath.length-1];
			vscode.window.showInformationMessage(splitPath[splitPath.length-1] + " " + resultInbox + " " + resultPackageName);
			vscode.window.activeTerminal.sendText(`flutter create --template=skeleton --org id.matasa.${packageRoot} ${resultInbox}`);
		} 
		else {
			message = "YOUR-EXTENSION: Working folder not found, open a folder an try again" ;
		
			vscode.window.showErrorMessage(message);
		}
		// printSomething("Hello");
		// vscode.window.showInformationMessage('Hello World from VS Code!');
		// vscode.window.terminals[0].sendText("echo");//flutter create -template=package --org id.matasa.human_resource login
	});

	context.subscriptions.push(disposable);
}
/**
 * Shows an input box using window.showInputBox().
 */
 async function showInputBox() {
	const result = await vscode.window.showInputBox({
		value: 'abcdef',
		valueSelection: [2, 4],
		placeHolder: 'For example: fedcba. But not: 123',
		validateInput: text => {
			vscode.window.showInformationMessage(`Validating: ${text}`);
			return text === '123' ? 'Not 123!' : null;
		}
	});

	return result
	// window.showInformationMessage(`Got: ${result}`);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
