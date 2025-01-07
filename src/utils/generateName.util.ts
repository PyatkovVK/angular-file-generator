import * as vscode from 'vscode';

export function generateNameUtil(type: string = 'Компонента'): Thenable<string | undefined> {
    return vscode.window.showInputBox({
        placeHolder: `Введите название ${type} // (название в UpperCase)`,
    });
}
