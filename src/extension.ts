import { commands, Disposable, env, ExtensionContext, window } from 'vscode';
import { CsvError } from 'csv-parse';

import { extensionName } from './constants';
import { convert } from './convert';

const disposables: Disposable[] = [];

//TODO: read format from copied excel datum.
//TODO: use user table format settings.
//TODO: user setting delimiter.

const pasteAsTabular = async (delimiter: string) => {
   const text = await env.clipboard.readText();
   const editor = window.activeTextEditor;
   if (!editor) return;

   const table = await convert(text, delimiter).catch((e: Error) => {
      if (e instanceof CsvError) window.showErrorMessage(`Could not convert to tabular. Reason: ${e.name} ${e.message}`);
      else window.showErrorMessage(`Could not paste. Reason: ${e.name} ${e.message}`);
   });
   if (!table) return;

   editor.edit(builder => {
      builder.insert(editor.selection.active, table);
   });
};

export function activate() {
   disposables.push(
      commands.registerCommand(`${extensionName}.pasteAsTabularFromCsv`, () => pasteAsTabular(',')),
      commands.registerCommand(`${extensionName}.pasteAsTabularFromExcel`, () => pasteAsTabular('\t'))
   );
}

export function deactivate() {
   disposables.forEach(d => d.dispose());
}
