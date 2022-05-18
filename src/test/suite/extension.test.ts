import * as assert from 'assert';
import {
   Extension,
   extensions
} from 'vscode';

import { extensionName, extensionPublisher } from '../../constants';

suite('Extension Activation', () => {
   let extension: Extension<any>;
   const timeout = async (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

   suiteSetup(() => {
      extension = extensions.getExtension(`${extensionPublisher}.${extensionName}`) as Extension<any>;
   });

   test('Activate extension', async () => {
      await extension.activate();
      assert.strictEqual(extension.isActive, true);
   });

   test('Extension loads in VSCode and is active', async () => {
      await timeout(1500);
      assert.strictEqual(extension.isActive, true);
   });
});
