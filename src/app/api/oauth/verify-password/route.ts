import {NextResponse} from "next/server";
import {prisma} from "~/utils/utils";

export const POST = async (request: Request) => {
  try {

      const {password, id} = await request.json();
      const user = await prisma.user.update({
          where: {
              id
          },
          data: {
              password,
              emailVerifToken: null
          }
      })

      if (user) {
          return NextResponse.json({message: 'success'}, {status: 200, headers: {'Content-Type': 'application/json'}})
      }
      return NextResponse.json({message: 'error password reset'}, {
          status: 400,
          headers: {'Content-Type': 'application/json'}
      })
  }catch (e) {
      return NextResponse.json({message: 'error'}, {status: 400, headers: {'Content-Type': 'application/json'}})
  }
}