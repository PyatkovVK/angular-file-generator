import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { generateNameUtil } from '../utils/generateName.util';
import { convertToFolderName } from '../utils/convertFolderName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';
import { convertClassNameUtil } from '../utils/convertClassName.util';

export async function generateComponent(uri: string): Promise<void> {
    const name: string | undefined = await generateNameUtil();

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    createComponent(name, uri);
}

function createComponent(name: string, uri: string): void {
    const folderName: string = convertToFolderName(name);
    const fileName: string = convertFileNameUtil(name);
    const className: string = convertClassNameUtil(name);

    try {
        const urlForNewFiles: string = path.join(uri, folderName);
        const scssUrl: string = path.join(urlForNewFiles, `${fileName}.component.scss`);
        const htmlUrl: string = path.join(urlForNewFiles, `${fileName}.component.html`);
        const tsUrl: string = path.join(urlForNewFiles, `${fileName}.component.ts`);

        // Создаем папку для компонента
        fs.mkdirSync(urlForNewFiles, {recursive: true});
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
  templateUrl: './${fileName}.component.html',
  styleUrls: ['./${fileName}.component.scss'],
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