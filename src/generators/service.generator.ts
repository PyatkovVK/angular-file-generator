import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { generateNameUtil } from '../utils/generateName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';
import { customQuestion } from '../utils/customQuestion';
import { convertClassNameUtil } from '../utils/convertClassName.util';

export async function serviceGenerate(uri: string): Promise<void> {
    const name: string | undefined = await generateNameUtil('сервиса');

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    const fileName: string = convertFileNameUtil(name);
    const className: string = convertClassNameUtil(name);
    const tsUrl: string = path.join(uri, `${fileName}.service.ts`);

    const typeService: string | undefined = await customQuestion('Сервис будет корневым?', 'Нет', 'Да');
    const serviceDecoratorOptions: string = typeService === 'Да' ? '{ providedIn: \'root\' }' : '';

    try {
        fs.writeFileSync(
            tsUrl,
            `import { Injectable } from '@angular/core';

@Injectable(${serviceDecoratorOptions})
export class ${className}Service {

}`,
            'utf-8',
        );

        vscode.window.showInformationMessage('Сервис создан');
    } catch (err) {
        vscode.window.showErrorMessage('Произошла ошибка, сервис не создан');
    }
}