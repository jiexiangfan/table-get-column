// getColumns.ts
import * as xlsx from "xlsx";
import * as fs from "fs";
import { GetColumnsOptions } from "./types";

//TODO: Implement better error handlings

export async function getColumns(options: GetColumnsOptions): Promise<any[]> {
  const {
    filePath,
    columnsToExtract,
    skipRow = 0,
    deleteFileAfterProcessing = true,
  } = options;

  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const table: any[][] = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      range: skipRow,
    });

    const headers: any[] = table[0];
    const tableData: any[][] = table
      .slice(1)
      .filter((row: any[]) => row.length > 0);

    const columnIndices: number[] = columnsToExtract.map((column: string) =>
      headers.findIndex(
        (header: any) =>
          header.toString().trim().toLowerCase() === column.trim().toLowerCase()
      )
    );

    // Check for columns not found
    if (columnIndices.some((index: number) => index === -1)) {
      throw new Error("One or more columns not found");
    }

    // Res will be an array of arrays, where each sub-array is the row data for the extracted columns
    const res = tableData
      .map((row: any[]) =>
        columnIndices.map((index: number) =>
          index >= 0 && index < row.length ? row[index] : undefined
        )
      )
      .filter((row: any[]) => row.every((cell: any) => cell !== undefined)); //TODO: make this optional

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
