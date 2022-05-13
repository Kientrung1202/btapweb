import Students from "../models/students";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

export const genStudents = async () => {
  const pathFile = getCSVFiles("students");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    studentCode: number;
    fullName: string;
    phone: string;
    birthday: string;
    className: string;
  }[] = [];
  content.map((line) => {
    const field = line.split(";");
    cleanField(field);
    const studentCode = Number(field[header.indexOf("studentCode")]);
    const fullName = field[header.indexOf("fullName")];
    const phone = field[header.indexOf("phone")];
    const birthday = field[header.indexOf("birthday")];
    const className = field[4];
    const item = {
      studentCode,
      fullName,
      phone,
      birthday,
      className,
    };
    data.push(item);
  });
  await Students.sync({ force: false })
    .then(() => {
      return Students.bulkCreate(data);
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((err: any) => {
      throw new Error(err.toString());
    });
};
