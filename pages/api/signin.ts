import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "../../lib/prisma";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      {
        expiresIn: "8h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("TRAX_ACCESS_TOKEN", token, {
        httpOnly: true, // cannot be accessed by JS
        maxAge: 8 * 60 * 60,
        path: "/", // entire site has access to this cookie
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // only encrypt in prod
      })
    );

    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Invalid email/password combination" });
  }
};
