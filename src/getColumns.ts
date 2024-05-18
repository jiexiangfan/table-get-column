// getColumns.ts
import * as xlsx from "xlsx";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { GetColumnsOptions } from "./types";

// Helper function to extract data from CSV
function extractDataFromCSV(filePath: string, skipRow: number): any[][] {
  const content = fs.readFileSync(filePath, "utf8");
  const records = parse(content, {
    skip_empty_lines: true,
    from_line: skipRow + 1,
  });
  return records;
}

// Helper function to extract data from Excel
function extractDataFromExcel(filePath: string, skipRow: number): any[][] {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const table: any[][] = xlsx.utils.sheet_to_json(sheet, {
    header: 1,
    range: skipRow,
  });
  return table;
}

export async function getColumns(options: GetColumnsOptions): Promise<any[]> {
  const {
    filePath,
    columnsToExtract,
    skipRow = 0,
    deleteFileAfterProcessing = false,
  } = options;

  try {
    const fileExtension = filePath.split(".").pop()?.toLowerCase();
    let table: any[][] = [];

    if (fileExtension === "csv") {
      table = extractDataFromCSV(filePath, skipRow);
    } else if (fileExtension === "xls" || fileExtension === "xlsx") {
      table = extractDataFromExcel(filePath, skipRow);
    } else {
      throw new Error(
        "Unsupported file format. Only CSV, XLS, and XLSX files are supported."
      );
    }

    const headers: any[] = table[0];

    const tableData: any[][] = table
      .slice(1)
      .filter((row: any[]) => row.length > 0);

    // Get the indices of the columns to extract
    const columnIndices: number[] = columnsToExtract.map((column: string) =>
      headers.findIndex(
        (header: any) =>
          header.toString().trim().toLowerCase() === column.trim().toLowerCase()
      )
    );

    // Check for columns not found
    const notFoundColumns = columnsToExtract.filter(
      (_, i) => columnIndices[i] === -1
    );
    if (notFoundColumns.length > 0) {
      throw new Error(`Columns not found: ${notFoundColumns.join(", ")}`);
    }

    // Res will be an array of JSON objects
    const res = tableData
      .map((row: any[]) => {
        const jsonRow: any = {};
        columnIndices.forEach((index: number, i: number) => {
          if (index >= 0 && index < row.length) {
            jsonRow[columnsToExtract[i]] = row[index];
          }
        });
        return jsonRow;
      })
      .filter((row: any) =>
        Object.values(row).every((cell: any) => cell !== undefined)
      ); //TODO: make this optional

    // Remove the uploaded file after processing
    if (deleteFileAfterProcessing) {
      fs.unlinkSync(filePath);
    }

    return res;
  } catch (error) {
    console.error("Error extracting data:", error);
    throw error;
  }
}
