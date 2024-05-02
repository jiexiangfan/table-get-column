# table-get-column

Extract data from specific column(s) of the spreadsheet file (xlsx, xls, csv) in Node.js. This package provides a straightforward API to specify which columns to extract, handling both large and small files efficiently.

## Installation

```
$ npm install table-get-column
```

## Usage

### Examples

Here is a quick example to get you started:

```
const { getColumns } = require('table-get-column');

const options: ExtractOptions = {
  filePath: 'path/to/your/file.xls',
  columnsToExtract: ['Email', 'Name', 'Age'],
};

const data = await extractColumnsFromXLSX(options);
console.log(data);
// Output: [['john@example.com', 'John Doe', 25], ['jane@example.com', 'Jane Smith', 30], ...]

```

## API

### getColumns

`getColumns` lets you get multiple columns from the data and return as an array of array.

```
getColumns(options)
```

#### Parameters

- `options`: The options or informations needed to get the data from columns. This is an object of values listed below
  - `filePath` - string of the file path of target csv/xls file.
  - `columnToExtract` - an array of string containing values of headers of the columns you wish to get.
  - optional `skipRow` - number of initial rows to skip. For example, if the headers of the table are on row 3, `skipRow = 2`.
  - optional `deleteFileAfterProcessing` - boolean value to indicate if the file provided need to be remove using `fs.unlinkSync(filePath)`.

#### Returns

`getColumns` returns an array of array, in which each inner array represent selected columns of the same row.

#### Caveats

- The developer is working on returning array of json instead of array of array. You might wanna check and update your code once it is done.

#### Error Handling

The `getColumns` function throws errors in the following cases:

- If one or more columns specified in columnsToExtract are not found in the header row.
- Additionally, it logs any errors that occur during the extraction process to the console. Make sure to handle these errors appropriately in your code.

## Contributing

Contributions are welcome, and any contributions you make are greatly appreciated! I am fairly new in open source and in coding in general, if you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Thanks!

## License

MIT
