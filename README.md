# table-get-column

Extract specific columns of data from spreadsheet files (xlsx, xls, csv) in Node.js. This package provides a straightforward API to specify which columns to extract, handling both large and small files efficiently.

## Installation

```
npm install table-get-column
```

## Usage

### Examples

Here is a quick example to get you started:

```
const { getColumns } = require('table-get-column');

const options: ExtractOptions = {
  filePath: 'path/to/your/file.xls',
  columnsToExtract: ['Email', 'Name', 'Age'],
  skipRow: 3 // Assuming the data starts from row 4
};

const data = await extractColumnsFromXLSX(options);
console.log(data);
// Output: [['john@example.com', 'John Doe', 25], ['jane@example.com', 'Jane Smith', 30], ...]

```

### API

```
getColumns(options) - Extracts columns from a specified file.
```

`options`

- filePath: String - Path to the file from which to extract data.
- columnsToExtract: Array<String> - List of column headers you want to extract.
- skipRow: Number (optional) - Number of initial rows to skip.

The `getColumns` function returns a Promise that resolves to a 2D array of any values, where each sub-array represents a row, and each element in the sub-array represents the extracted column value for that row. The function also removes the uploaded file after processing.

### Error Handling

The `getColumns` function throws errors in the following cases:

- If one or more columns specified in columnsToExtract are not found in the header row.
- Additionally, it logs any errors that occur during the extraction process to the console. Make sure to handle these errors appropriately in your code.

## Contributing

Contributions are welcome, and any contributions you make are greatly appreciated! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

MIT
