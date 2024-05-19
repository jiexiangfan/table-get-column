"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumns = void 0;
// getColumns.ts
const xlsx = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
const sync_1 = require("csv-parse/sync");
// Helper function to extract data from CSV
function extractDataFromCSV(filePath, skipRow) {
    const content = fs.readFileSync(filePath, "utf8");
    const records = (0, sync_1.parse)(content, {
        skip_empty_lines: true,
        from_line: skipRow + 1,
    });
    return records;
}
// Helper function to extract data from Excel
function extractDataFromExcel(filePath, skipRow) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const table = xlsx.utils.sheet_to_json(sheet, {
        header: 1,
        range: skipRow,
    });
    return table;
}
function getColumns(options) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { filePath, columnsToExtract, skipRow = 0, deleteFileAfterProcessing = false, } = options;
        try {
            const fileExtension = (_a = filePath.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            let table = [];
            if (fileExtension === "csv") {
                table = extractDataFromCSV(filePath, skipRow);
            }
            else if (fileExtension === "xls" || fileExtension === "xlsx") {
                table = extractDataFromExcel(filePath, skipRow);
            }
            else {
                throw new Error("Unsupported file format. Only CSV, XLS, and XLSX files are supported.");
            }
            const headers = table[0];
            const tableData = table
                .slice(1)
                .filter((row) => row.length > 0);
            // Get the indices of the columns to extract
            const columnIndices = columnsToExtract.map((column) => headers.findIndex((header) => header.toString().trim().toLowerCase() === column.trim().toLowerCase()));
            // Check for columns not found
            const notFoundColumns = columnsToExtract.filter((_, i) => columnIndices[i] === -1);
            if (notFoundColumns.length > 0) {
                throw new Error(`Columns not found: ${notFoundColumns.join(", ")}`);
            }
            // Res will be an array of JSON objects
            const res = tableData
                .map((row) => {
                const jsonRow = {};
                columnIndices.forEach((index, i) => {
                    if (index >= 0 && index < row.length) {
                        jsonRow[columnsToExtract[i]] = row[index];
                    }
                });
                return jsonRow;
            })
                .filter((row) => Object.values(row).every((cell) => cell !== undefined)); //TODO: make this optional
            // Remove the uploaded file after processing
            if (deleteFileAfterProcessing) {
                fs.unlinkSync(filePath);
            }
            return res;
        }
        catch (error) {
            console.error("Error extracting data:", error);
            throw error;
        }
    });
}
exports.getColumns = getColumns;
