# table-get-column

Extract data from specific column(s) of the spreadsheet file (xlsx, xls, csv) in Node.js. This package provides a straightforward API to specify which columns to extract, handling both large and small files efficiently.

## Installation

```sh
$ npm install table-get-column
```

## Getting Started

Here's how to quickly get started with the table-get-column package:

```js
const { getColumns } = require("table-get-column");

const options = {
  filePath: "path/to/your/file.xls",
  columnsToExtract: ["Email", "Name", "Age"],
};

getColumns(options)
  .then((data) => {
    console.log(data);
    // Output: [{ Email: 'john@example.com', Name: 'John Doe', Age: 25 }, { Email: 'jane@example.com', Name: 'Jane Smith', Age: 30 }, ...]
  })
  .catch((err) => {
    console.error(err);
  });
```

## API

### getColumns

`getColumns` lets you get multiple columns from the data and returns an array of JSON objects.

```js
getColumns(options);
```

#### Parameters

- `options`: The options or informations needed to get the data from columns. This is an object of values listed below:

  - `filePath` - string of the file path of the target CSV/XLS file.
  - `columnToExtract` - an array of strings containing the headers of the columns you wish to extract.
  - optional `skipRow` - number of initial rows to skip. For example, if the headers of the table are on row 3, skipRow = 2.
  - optional `deleteFileAfterProcessing` - boolean value to indicate if the file provided should be removed using `fs.unlinkSync(filePath)`.

#### Returns

`getColumns` returns an array of JSON objects, where each object represents a row with the specified columns.

#### Error Handling

The `getColumns` function throws errors in the following cases:

- If one or more columns specified in columnsToExtract are not found in the header row.
- Additionally, it logs any errors that occur during the extraction process to the console. Make sure to handle these errors appropriately in your code.

## Contributing

Contributions are welcome, and any contributions you make are greatly appreciated! I am fairly new to open source and coding in general. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Thanks!

## License

MIT
