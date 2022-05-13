import { logErr } from "../services/log";
import { genStudents } from "./genStudents";

const generateDb = async () => {
  try {
    genStudents();
  } catch (err) {
    logErr("Error", "Gen DB");
  }
};
export default generateDb;
