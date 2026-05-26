export { auth as middleware } from "@/auth";

export const config = {
  matcher: ["/dashboard/:path*", "/screener/:path*", "/portfolio/:path*", "/reports/:path*", "/funds/:path*"],
};
