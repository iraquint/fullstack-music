import { NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req, res) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    // not a node environment, can't use prisma here to query for a user
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("signin");
    }
  }
}
