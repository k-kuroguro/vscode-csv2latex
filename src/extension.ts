import { commands, Disposable, env, window, workspace } from 'vscode';
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

   const pasteBodyOnly = workspace.getConfiguration(extensionName).get<boolean>('pasteBodyOnly', false);
   const table = await convert(text, delimiter, { pasteBodyOnly }).catch((e: Error) => {
      if (e instanceof CsvError) window.showErrorMessage(`Could not convert to tabular. Reason: ${e.name} ${e.message}`);
      else window.showErrorMessage(`Could not paste. Reason: ${e.name} ${e.message}`);
   });
   if (!table) return;

   editor.edit(builder => {
      builder.insert(editor.selection.active, table);
   });
};

const enablePastingBodyOnly = () => workspace.getConfiguration(extensionName).update('pasteBodyOnly', true);
const disablePastingBodyOnly = () => workspace.getConfiguration(extensionName).update('pasteBodyOnly', false);

export function activate() {
   disposables.push(
      commands.registerCommand(`${extensionName}.pasteAsTabularFromCsv`, () => pasteAsTabular(',')),
      commands.registerCommand(`${extensionName}.pasteAsTabularFromExcel`, () => pasteAsTabular('\t')),
      commands.registerCommand(`${extensionName}.enablePastingBodyOnly`, () => enablePastingBodyOnly()),
      commands.registerCommand(`${extensionName}.disablePastingBodyOnly`, () => disablePastingBodyOnly())
   );
}

export function deactivate() {
   disposables.forEach(d => d.dispose());
}
