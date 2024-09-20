import {NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "~/service/user.service";
import {prisma} from "~/utils/utils";
import {DateTime} from "schema-dts";

export const POST = async (request: NextRequest) => {
    const {name} = await request.json();
    const token = request.cookies.get('access_token')?.value
    const user = await getCurrentUser(token);
    console.log(user)
    if (!user) return NextResponse.json({message: 'not authorized'}, {
        status: 400,
        headers: {'Content-Type': 'application/json'}
    })
    if(!name) return NextResponse.json({message: 'name is required'}, {
        status: 400,
        headers: {'Content-Type': 'application/json'}
    })

    if (!allowNameChangeAfterAweek(name?.nameChangeAt)) {
        return NextResponse.json({message: 'Please wait for 7 days since last your name changed date before you can change your name again'}, {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        })
        // Allow name change
       // Update the time of the last name change
        // Proceed with the name change
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            name,
            nameChangeAt: new Date()
        }
    })
    if (updatedUser) {
        return NextResponse.json({message: 'success'}, {status: 200, headers: {'Content-Type': 'application/json'}})
        }
    return NextResponse.json({message: 'error'}, {
        status: 400,
        headers: {'Content-Type': 'application/json'}
    })

    }


const allowNameChangeAfterAweek=(nameChangeAt:any)=>{
if(nameChangeAt===null) return true
    if(nameChangeAt){
        const now = new Date();
        const lastChange = new Date(nameChangeAt);
        const diff = now.getTime() - lastChange.getTime();
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        if (diffDays > 7) {
            return true
        }
    }

    return false

}