import Students from "../../../../models/students";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { badRequest, success } from "../../../../utils/response";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (req: Request) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const { userId, userName, fullName, phone, address } = req.body;
  return Students.create({
    userId,
    userName,
    password: hash,
    fullName,
    phone,
    address,
    createdAt: new Date(),
    lastLogin: new Date(),
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  const userInfo = await Students.findOne({
    where: { userName },
  });
  if (!userInfo) {
    res.json(badRequest("Username or password is incorrect!"));
  } else {
    bcrypt.compare(
      password,
      userInfo.getDataValue("password"),
      (err, result) => {
        if (err) res.json(badRequest("Password is incorrect!"));
        if (result) {
          const token = jwt.sign(
            {
              userName,
              userId: userInfo.getDataValue("userId"),
            },
            process.env.SECRET_KEY_JWT || "mypet",
            {
              expiresIn: "7d", // if this is number, this is second
            }
          );
          Students.update(
            { lastLogin: new Date() },
            { where: { userId: userInfo.getDataValue("userId") } }
          )
            .then(() => {
              res.json(
                success({
                  token,
                  userName: userInfo.getDataValue("userName"),
                  password: userInfo.getDataValue("password"),
                })
              );
            })
            .catch((err: any) => {
              res.json(badRequest(err));
            });
        }
      }
    );
  }
};
