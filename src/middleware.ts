import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export let response: any;
export const config = {
  matcher: "/((?!login).*)",
};
// console.log(config);
export async function middleware(req: NextRequest) {
  // const pathname = req.nextUrl.pathname;
  // // const publicPaths = ["/login"];
  // // const protectedPaths = ["/", "/test", "/sandbox"];
  // const protectedPaths = ["/", "/test", "/sandbox", "/categories"];
  // const isPathProtected = protectedPaths?.some((path) => pathname == path);
  // // const isPathProtected = protectedPaths?.some((path) =>
  // //   pathname.startsWith(path)
  // // );
  // const res = NextResponse.next();
  // if (isPathProtected) {
  //   console.log("middleware:", isPathProtected);
  //   const token = await getToken({ req });
  //   if (!token) {
  //     const url = new URL(`/login`, req.url);
  //     console.log(req.url);
  //     // url.searchParams.set("callbackUrl", pathname);
  //     return NextResponse.redirect(url);
  //   }
  // }
  // return (response = res);
}

export default middleware;
