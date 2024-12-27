import * as vscode from 'vscode';

export function generateNameUtil(): Thenable<string | undefined> {
    return vscode.window.showInputBox({
        placeHolder: 'Введите название компоненты // (название в UpperCase)',
    });
}
