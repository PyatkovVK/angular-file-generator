import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { Platform } from '../enums/platforms.enum';
import { generateNameUtil } from '../utils/generateName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';
import { generatePlatformUtil } from '../utils/generatePlatform.util';
import { convertFileNameWithPlatformUtil } from '../utils/convertFileNameWithPlatform.util';
import { convertToFolderName } from '../utils/convertFolderName.util';

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
    const fileNameWithPlatform: string = convertFileNameWithPlatformUtil(name, metadata?.platform);
    const fileNameWithPlatformToLowerCase: string = convertFileNameWithPlatformUtil(name, metadata?.platform, true);

    try {
        const urlForNewFiles: string = `${uri}/${folderName}`;

        // Создаем папку для компонента
        fs.mkdir(urlForNewFiles, (err) => {
        });

        // Создаем html
        fs.writeFile(`${urlForNewFiles}/${fileNameWithPlatformToLowerCase}.component.html`, '', 'utf-8', (err) => {
        });

        // Создаем папку стилей и scss
        fs.mkdir(`${urlForNewFiles}/styles/`, (err) => {
        });

        fs.writeFile(`${urlForNewFiles}/styles/${fileNameWithPlatformToLowerCase}.component.scss`, '', 'utf-8', (err) => {
            vscode.window.showErrorMessage(JSON.stringify(err));
        });

        // //Создаем ts файл
        // createFileFromTemplate(
        //     '../templates/component.txt',
        //     urlForNewFiles,
        //     {
        //         selector: `app-${fileName}`,
        //         name: name,
        //         fileNameWithPlatform: fileNameWithPlatform,
        //     },
        // );

        vscode.window.showErrorMessage('Компонента создана');
        vscode.window.showErrorMessage(uri);

    } catch {
        vscode.window.showErrorMessage('Произошла ошибка, компонента не создана');
    }
}

// Функция для чтения шаблона и замены плейсхолдеров
function createFileFromTemplate(templatePath: string, outputDir: string, replacements: {
    [key: string]: string
}): void {
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Не найден шаблон:', err);
            return;
        }

        let result = data;
        for (const key in replacements) {
            const placeholder = `{{${key}}}`;
            const value = replacements[key];
            result = result.replace(new RegExp(placeholder, 'g'), value);
        }

        // Получаем путь для сохранения файла
        const outputPath = path.join(outputDir, 'output.txt');

        // Записываем изменённый файл
        fs.writeFile(outputPath, result, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File created successfully:', outputPath);
        });
    });
}