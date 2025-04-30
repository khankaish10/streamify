import {type NextRequest, NextResponse} from "next/server"
import { NextURL } from "next/dist/server/web/next-url";


export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // check if route is protected
    const token = request.cookies.get("accessToken")?.value || null;
    console.log("token", token)

    if(!token) {
        if (pathname !== "/auth/login" && pathname !== "/auth/register") {
            return NextResponse.redirect(new URL('/auth/login', request.url))
          }
    } else {
        if (pathname === "/auth/login" || pathname === "/auth/register") {
            return NextResponse.redirect(new URL('/', request.url))
          }
    }

    return NextResponse.next();
}

export const config = { 
    matcher: [
        "/profile",
        "/videos/watch/:id",
        "/auth/login",
        "/auth/register",
    ]
}

