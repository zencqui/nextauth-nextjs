import { auth } from "../../../auth"
import { getToken } from "next-auth/jwt";

export const GET = auth(async (req) => {

   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   if (token) {
        // Access the stored access token
        const accessToken = token.accessToken;
        // Use accessToken to make requests to external APIs, etc.
        return Response.json({ message: "Access token retrieved", accessToken })
      } else {
        return Response.json({ message: "Not authenticated" }, { status: 401 })
      }
})
