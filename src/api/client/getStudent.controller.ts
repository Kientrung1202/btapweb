import { Request, Response } from "express";
import "dotenv/config";

import express from "express";
import Students from "../../models/students";
import { badRequest, success } from "../../utils/response";
const router = express.Router();

router.get("/students", (req: Request, res: Response) => {
  Students.findAll().then((result) => res.json(success(result)));
});

router.get(`/students/:id`, (req: Request, res: Response) => {
  Students.findByPk(req.params.id)
    .then((result) => {
      if (!result) return res.json(success("Don't have the student!"));
      return res.json(success(result));
    })
    .catch((err) => res.json(badRequest(err)));
});
router.delete("/student/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  Students.destroy({
    where: {
      id,
    },
  })
    .then(() => res.json(success("Delete students successfully")))
    .catch((err) => res.json(badRequest(err)));
});
router.put("/students/:id", (req: Request, res: Response) => {
  const { studentCode, fullName, phone, birthday, address, className } =
    req.body;
  const id = req.params.id;
  Students.update(
    {
      studentCode,
      fullName,
      phone,
      birthday,
      address,
      className,
    },
    {
      where: {
        id,
      },
    }
  )
    .then(() => res.json(success("Update student successfully")))
    .catch((err) => res.json(badRequest(err)));
});
router.post("/students/:id", (req: Request, res: Response) => {
  const { studentCode, fullName, address, className } = req.body;
  const id = req.params.id;
  Students.create({
    id,
    studentCode,
    fullName,
    address,
    className,
  })
    .then(() => res.json(success("Create student successfully")))
    .catch((err) => res.json(badRequest(err)));
});
module.exports = router;
