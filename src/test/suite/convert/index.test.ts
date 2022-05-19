import * as assert from 'assert';
import { readFileSync } from 'fs';
import { join } from 'path';

import { convert } from '../../../convert';

type InputType = 'csv' | 'excel';

suite('Conversion', () => {
   const makeConsistent = (text: string): string => text.replace(/\r\n/g, '\n');

   const testConversion = async (inputType: InputType) => {
      const [inputFilename, delimiter] = inputType === 'csv' ? ['csv.in', ','] : ['excel.in', '\t'];
      const input = readFileSync(join(__dirname, 'in_out', inputFilename)).toString();
      const expectedOutput = makeConsistent(readFileSync(join(__dirname, 'in_out', 'tabular.out')).toString());
      const output = makeConsistent(await convert(input, delimiter));
      assert.strictEqual(output, expectedOutput);
   };

   test('Convert from CSV', () => testConversion('csv'));

   test('Convert from Excel', () => testConversion('excel'));
});
