import * as vscode from 'vscode';
import { generateComponent } from './generators/component.generator';
import { getPath } from './utils/getPath.util';
import { moduleGenerate } from './generators/module.generator';
import { serviceGenerate } from './generators/service.generator';
import { directiveGenerate } from './generators/directive.generator';

export function activate(context: vscode.ExtensionContext) {
    const generators = [
        { name: 'angFG.generateComponent', generator: generateComponent },
        { name: 'angFG.generateModule', generator: moduleGenerate },
        { name: 'angFG.generateService', generator: serviceGenerate },
        { name: 'angFG.generateDirective', generator: directiveGenerate },
    ];

    generators.forEach(generator => {
        context.subscriptions.push(vscode.commands.registerCommand(generator.name, (...args) => generator.generator(getPath(args))));
    });
}

export function deactivate() {
}
