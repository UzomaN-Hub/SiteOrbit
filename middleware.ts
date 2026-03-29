export default function middleware() {}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/builder/:path*",
    "/analytics/:path*",
    "/team/:path*",
    "/templates/:path*",
    "/domains/:path*",
    "/settings/:path*"
  ],
};
