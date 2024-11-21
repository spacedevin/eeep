# EEEP!

A TypeScript implementation inspired by the EPPlus .NET library for Excel manipulation.

## Installation

```bash
npm install [insert eeep here]
```

## Usage

```typescript
import { ExcelPackage } from 'eeep';

// Create a new Excel package
const package = new ExcelPackage();

// Add a worksheet
const worksheet = package.worksheets.add('Sheet1');

// Set cell values
worksheet.setCellValue('A1', 'Hello');
worksheet.setCellValue('B1', 'World');

// Save the workbook
const buffer = package.saveAs('example.xlsx');
```

## Features

- Create new Excel workbooks
- Add/remove worksheets
- Read and write cell values
- Save workbooks as XLSX files

## License

MIT