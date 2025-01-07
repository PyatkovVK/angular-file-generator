import * as vscode from "vscode";
import * as fs from "fs";
import * as path from 'path';
import { generateNameUtil } from '../utils/generateName.util';
import { convertFileNameUtil } from '../utils/convertFileName.util';

export async function moduleGenerate(uri: string): Promise<void> {
    const name: string | undefined = await generateNameUtil('модуля');

    if (!name) {
        vscode.window.showErrorMessage('Не указано имя файла');

        return;
    }

    const fileName: string = convertFileNameUtil(name);
    const tsUrl: string = path.join(uri, `${fileName}.module.ts`);

    try {
        fs.writeFileSync(
            tsUrl,
            `import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [],
})
export class ${name}Module {

}`,
            'utf-8',
        );

        vscode.window.showInformationMessage('Модуль создан');
    } catch (err) {
        vscode.window.showErrorMessage('Произошла ошибка, модуль не создан');
    }
}