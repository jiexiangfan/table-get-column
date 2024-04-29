export type GetColumnsOptions = {
    filePath: string;
    columnsToExtract: string[];
    skipRow?: number;
    deleteFileAfterProcessing?: boolean;
};
