import * as vscode from 'vscode';
import { generateComponent } from './generators/component.generator';

export function activate(context: vscode.ExtensionContext) {
	const componentGenerator = vscode.commands.registerCommand('angFG.generateComponent', generateComponent.bind(null, context));

	context.subscriptions.push(componentGenerator);
}

export function deactivate() { }
