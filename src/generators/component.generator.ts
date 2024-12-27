import * as vscode from "vscode";
import { generateNameUtil } from '../utils/generateName.util';
import { Platform } from '../enums/platforms.enum';
import { convertFileNameUtil } from '../utils/convertFileName.util';

export async function generateComponent(context: vscode.ExtensionContext): Promise<void> {
    const name: string | undefined = await generateNameUtil();

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    let platform: string | undefined = await generateNameUtil();

    if (platform === Platform.custom) {
        platform = await vscode.window.showInputBox({
            placeHolder: 'Введите название вашей платформы'
        });
    }

    createComponent(name, platform)
}

function createComponent(name: string, platform?: string): void {
    const fileNameWithPlatform: string = convertFileNameUtil(name, platform);

    console.log(`Creating ${fileNameWithPlatform}`);
}