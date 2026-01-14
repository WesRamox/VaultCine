import withAuth from "next-auth/middleware";

export default withAuth(
  function middleware() {

  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"],
}