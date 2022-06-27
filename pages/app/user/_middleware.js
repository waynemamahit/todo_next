import { NextResponse } from "next/server";

export function middleware(req) {
  const { redirect, next } = NextResponse;
  if (req.cookies.role == 2) return redirect(new URL("/app", req.url));
  return next();
}
