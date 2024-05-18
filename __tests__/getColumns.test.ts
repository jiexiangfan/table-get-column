import { getColumns } from "../src/getColumns";
import path from "path";

test("extracts specified columns from Excel file", async () => {
  const filePath = path.resolve(__dirname, "sample_files/test.xls");

  const options = {
    filePath,
    columnsToExtract: ["EMAIL_ADDRESS", "STUDENT_CODE", "BIRTH_YR"],
    skipRow: 6,
  };

  const result = await getColumns(options);

  expect(result).toEqual([
    {
      EMAIL_ADDRESS: "jbas0020@student.edu",
      STUDENT_CODE: 31116600,
      BIRTH_YR: "2003",
    },
    {
      EMAIL_ADDRESS: "abcc0123@student.edu",
      STUDENT_CODE: 34051333,
      BIRTH_YR: "2004",
    },
  ]);
});
