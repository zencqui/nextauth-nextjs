import { auth } from "../../../auth"

export const GET = auth(async (req) => {

   if (req.auth) {
        // Access the stored access token
        const accessToken = req.auth?.accessToken
        // Use accessToken to make requests to external APIs, etc.
        return Response.json({ message: "Access token retrieved", accessToken })
      } else {
        return Response.json({ message: "Not authenticated" }, { status: 401 })
      }
})
