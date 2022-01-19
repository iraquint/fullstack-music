import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next/types";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }

      return handler(res, req, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};
