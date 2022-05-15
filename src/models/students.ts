import { db } from "../db";
import Sequelize from "sequelize";

const Students = db.sequelize.define(
  "students",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    studentCode: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    fullName: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(15),
    },
    birthday: {
      type: Sequelize.DATEONLY,
    },
    address: {
      type: Sequelize.STRING(45),
    },
    className: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // by default sequelize will pluralize name of model and table(ex: person -> people),
    // this infer table name to be equal to the model name, without any modification
    timestamps: false,
  }
);
export default Students;
