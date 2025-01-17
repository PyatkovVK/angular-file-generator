import * as vscode from 'vscode';

export function getPath(args: any[]): string {
    let path: string | null = null;

    if (args && args.length > 0) {
        path = args[0].fsPath;
    }

    if (!path) {
        path = vscode.window.activeTextEditor?.document?.fileName ?? "";
    }

    return path;
}