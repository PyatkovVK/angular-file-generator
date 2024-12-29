import * as vscode from 'vscode';
import { generateComponent } from './generators/component.generator';
import { getPath } from './utils/getPath.util';

export function activate(context: vscode.ExtensionContext) {
    const componentGenerator = vscode.commands.registerCommand('angFG.generateComponent', (...args) => generateComponent(getPath(args)));

    context.subscriptions.push(componentGenerator);
}

export function deactivate() {
}
