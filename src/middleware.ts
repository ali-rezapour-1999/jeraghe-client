import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard"];
const dashPrivatePaths = ["/write", "/ideas/create"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));
  const isDashPrivatePath = dashPrivatePaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isPrivatePath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isDashPrivatePath && !token) {
    const response = NextResponse.next();
    response.headers.set("x-require-login", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/write/:path*", "/ideas/create"],
};
