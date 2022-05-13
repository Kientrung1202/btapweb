import Students from "../../models/students";
import { NextFunction, Request, Response } from "express";
import { badRequest } from "../../utils/response";

const checkSignup = async (req: Request, res: Response, next: NextFunction) => {
  const { userName, phone } = req.body;
  try {
    const userInfo = await Students.findOne({
      where: {
        userName,
      },
    });
    if (userInfo) {
      res.json(badRequest("Username has already in use!"));
      return;
    }
    const userInfo2 = await Students.findOne({
      where: {
        phone,
      },
    });
    if (userInfo2) {
      res.json(badRequest("Phone has already in use!"));
      return;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = {
  checkSignup,
};
