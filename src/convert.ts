import { parse } from 'csv-parse';

type Options = {
   pasteBodyOnly: boolean
};

const escape = (text: string): string => {
   const specialChars: { [key in string]: string } = {
      '#': '\\#',
      '$': '\\$',
      '%': '\\%',
      '&': '\\&',
      '~': '\\textasciitilde',
      '_': '\\_',
      '^': '\\textasciicircum',
      '\\': '\\textbackslash',
      '{': '\\{',
      '}': '\\}',
      '|': '\\textbar',
      '<': '\\textless',
      '>': '\\textgreater'
   };
   return text.replace(/[#$%&~_^\\{}|<>]/g, m => specialChars[m] ?? m);
};

const convert = async (text: string, delimiter: string, options?: Partial<Options>): Promise<string> => {
   return new Promise((res, rej) => {
      parse(text, { delimiter }, (err, data: string[][]) => {
         if (err) rej(err);

         let maxCol = 0;
         data.forEach(row => {
            if (maxCol < row.length) maxCol = row.length;
         });

         let tabular = options?.pasteBodyOnly ? '' : `\\begin{table}\n\\begin{tabular}{${Array(maxCol).fill('l').join('')}}\n`;
         data.forEach(row => {
            row.forEach((cell, index) => {
               tabular += escape(cell) + (index === row.length - 1 ? '' : '&');
            });
            if (row.length < maxCol) tabular += '&' + Array(maxCol - row.length).join('&');
            tabular += '\\\\\n';
         });
         tabular += options?.pasteBodyOnly ? '' : '\\end{tabular}\n\\end{table}\n';
         res(tabular);
      });
   });
};

export { convert };
