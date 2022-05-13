import { Request, Response } from "express";
import "dotenv/config";

import express from "express";
import Students from "../../models/students";
import { success } from "../../utils/response";
const router = express.Router();

router.get("/student", (req: Request, res: Response) => {
  Students.findAll().then((result) => res.json(success(result)));
});
module.exports = router;
