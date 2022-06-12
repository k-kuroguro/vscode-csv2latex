# CSV2LaTeX

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version-short/k-kuroguro.csv2latex.svg)](https://marketplace.visualstudio.com/items?itemName=k-kuroguro.csv2latex)
[![CI](https://github.com/k-kuroguro/vscode-csv2latex/actions/workflows/main.yaml/badge.svg)](https://github.com/k-kuroguro/vscode-csv2latex/actions/workflows/main.yaml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
    <img alt="vscode-csv2latex" src="./resources/icon_500.png" width=200>
</div>

---

VSCode extension for converting CSV or Excel table to LaTeX tabular.

![Demo](./resources/demo.gif)

# How to use

1. Copy CSV or Excel table.
2. Execute command `CSV2LaTeX: Paste As Tabular From CSV` or `Excel` via command palette or context menu.

# Available Commands

 - `CSV2LaTeX: Paste As Tabular From CSV`
 - `CSV2LaTeX: Paste As Tabular From Excel`
 - `CSV2LaTeX: Enable Pasting Body Only`
 - `CSV2LaTeX: Disable Pasting Body Only`

# Available Config

## pasteBodyOnly

This controls whether pasting body only.
You can enable or disable not only via `settings.json` but also via command `CSV2LaTeX: Enable Pasting Body Only` or `CSV2LaTeX: Disable Pasting Body Only`.

True
```tex
index   & x    & y    & z   \\
1       & 10.1 & 23.4 & 3.2 \\
2       & 10.3 & 23.7 & 3.3 \\
3       & 10.4 & 23.8 & 3.1 \\
4       & 10.0 & 23.6 & 3.3 \\
5       & 10.2 & 23.6 & 3.4 \\
average & 10.2 & 23.6 & 3.3 \\
```

False
```tex
\begin{table}
   \begin{tabular}{llll}
      index   & x    & y    & z   \\
      1       & 10.1 & 23.4 & 3.2 \\
      2       & 10.3 & 23.7 & 3.3 \\
      3       & 10.4 & 23.8 & 3.1 \\
      4       & 10.0 & 23.6 & 3.3 \\
      5       & 10.2 & 23.6 & 3.4 \\
      average & 10.2 & 23.6 & 3.3 \\
   \end{tabular}
\end{table}
```
