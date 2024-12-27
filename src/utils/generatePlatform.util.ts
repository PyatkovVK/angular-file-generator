import * as vscode from 'vscode';
import { Platform } from '../enums/platforms.enum';

export function generatePlatformUtil(): Thenable<string | undefined> {
    return vscode.window.showQuickPick([
        Platform.none,
        Platform.web,
        Platform.adaptive,
        Platform.mobile,
        Platform.custom,
    ], {
        placeHolder: 'Выберите платформу',
    });
}
