import {NextResponse} from "next/server";
import { hashPassword } from "~/utils/passwordHasher";
import {prisma} from "~/utils/utils";

export const POST = async (request: Request) => {
  try {

      const {password, id} = await request.json();

      const hashedPassword=await hashPassword(password)
      const user = await prisma.user.update({
          where: {
              id
          },
          data: {
              password:hashedPassword,
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
  }catch (e:any) {
      return NextResponse.json({message: e.message}, {status: 400, headers: {'Content-Type': 'application/json'}})
  }
}