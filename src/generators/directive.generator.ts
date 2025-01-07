import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { generateNameUtil } from '../utils/generateName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';
import { customQuestion } from '../utils/customQuestion';

export async function directiveGenerate(uri: string): Promise<void> {
    const name: string | undefined = await generateNameUtil('директивы');

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    const fileName: string = convertFileNameUtil(name);
    const tsUrl: string = path.join(uri, `${fileName}.directive.ts`);

    const needSelector: string | undefined = await customQuestion('Будет ли селектор?', 'Нет', 'Да');
    let selectorName: string | undefined = '';

    if (needSelector === 'Да') {
        selectorName = await vscode.window.showInputBox({
            placeHolder: 'Введите название селектора',
        });
    }

    try {
        fs.writeFileSync(
            tsUrl,
            `import { Directive } from '@angular/core';

@Directive({
    ${!selectorName ? '' : `selector: '[${selectorName}]'`}
})
export class ${name}Directive {

}`,
            'utf-8',
        );

        vscode.window.showInformationMessage('Директива создана');
    } catch (err) {
        vscode.window.showErrorMessage('Произошла ошибка, директива не создана');
    }
}