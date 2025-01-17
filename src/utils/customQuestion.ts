import vscode from 'vscode';

export function customQuestion(question: string, ...args: string[]): Thenable<string | undefined> {
    return vscode.window.showQuickPick([
        ...args,
    ], {
        placeHolder: question,
    });
}