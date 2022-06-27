import { NextResponse } from "next/server";

export function middleware(req) {
  const { redirect, next } = NextResponse;
  if (!req.cookies?.token) return redirect(new URL("/", req.url));
  return next();
}
