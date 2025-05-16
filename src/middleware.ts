import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard"];
const dashPrivatePaths = ["/post/create", "/ideas/create"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path));
  const isDashPrivatePath = dashPrivatePaths.some((path) =>
    pathname.startsWith(path)
  );

  if ((isPrivatePath || isDashPrivatePath) && !token) {
    const response = NextResponse.next();
    response.headers.set("x-require-login", "true");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/post/create", "/ideas/create"],
};
