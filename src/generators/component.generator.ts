import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { Platform } from '../enums/platforms.enum';
import { generateNameUtil } from '../utils/generateName.util';
import { generatePlatformUtil } from '../utils/generatePlatform.util';
import { convertFileNameWithPlatformUtil } from '../utils/convertFileNameWithPlatform.util';
import { convertToFolderName } from '../utils/convertFolderName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';
import { convertToClassName } from '../utils/convertToClassName.util';

export async function generateComponent(uri: string): Promise<void> {
    const name: string | undefined = await generateNameUtil();

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    let platform: string | undefined = await generatePlatformUtil();

    if (platform === Platform.custom) {
        platform = await vscode.window.showInputBox({
            placeHolder: 'Введите название вашей платформы',
        });
    }

    createComponent(name, uri, {
        platform,
    });
}

function createComponent(name: string, uri: string, metadata?: {
    platform?: string,
}): void {
    const folderName: string = convertToFolderName(name);
    const fileName: string = convertFileNameUtil(name);
    const fileNameWithPlatformToLowerCase: string = convertFileNameWithPlatformUtil(name, metadata?.platform, true);
    const className: string = convertToClassName(name, metadata?.platform as Platform);

    try {
        const urlForNewFiles: string = path.join(uri, folderName);
        const stylesUrl: string = path.join(urlForNewFiles, 'styles');
        const scssUrl: string = path.join(stylesUrl, `${fileNameWithPlatformToLowerCase}.component.scss`);
        const htmlUrl: string = path.join(urlForNewFiles, `${fileNameWithPlatformToLowerCase}.component.html`);
        const tsUrl: string = path.join(urlForNewFiles, `${fileNameWithPlatformToLowerCase}.component.ts`);

        // Создаем папку для компонента
        fs.mkdirSync(urlForNewFiles, {recursive: true});
        // Создаем папку стилей
        fs.mkdirSync(stylesUrl, {recursive: true});
        // Создаем html
        fs.writeFileSync(htmlUrl, '', 'utf-8');
        // Создаем стили
        fs.writeFileSync(scssUrl, '', 'utf-8');
        // //Создаем ts файл
        fs.writeFileSync(
            tsUrl,
            `import { Component } from '@angular/core';

@Component({
    selector: 'app-${fileName}',
    templateUrl: './${fileNameWithPlatformToLowerCase}.component.html',
    styleUrls: ['./styles/${fileNameWithPlatformToLowerCase}.component.scss'],
    standalone: true,
})
export class ${className}Component {

}`,
            'utf-8',
        );

        vscode.window.showInformationMessage('Компонента создана');
    } catch (err) {
        vscode.window.showErrorMessage('Произошла ошибка, компонента не создана');
    }
}