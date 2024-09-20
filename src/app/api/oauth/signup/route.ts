import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookieOptions, generateAccessToken, generateRefreshToken } from "~/service/jwt.service";
import { hashPassword } from "~/utils/passwordHasher";
import { prisma } from "~/utils/utils";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existUser = await prisma.user.findFirst({ where: { email } });
        
        if (existUser) {
            return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 }); // 409 Conflict
        }

        // Create a new user
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: 'email',
                isEmailVerified: false,
                dubbingProjects: { create:[] },
                isSubscribed: false,
                payments: { create: [] },
                subscriptionHistories: { create: [] },
                subscriptions: { create: [] },
                emailVerifToken: "",
                emailHash: "",
                auditTrails: { create: [] },
                picture: 'https://tse3.mm.bing.net/th?id=OIP.HHVUf3TYqncgpJXyCMmxyAHaHa&pid=Api&P=0&h=180',
                credits: 10,

            }
        });

        // Set cookies for authentication tokens
        cookies().set('access_token', await generateAccessToken(user.id), cookieOptions(10));
        cookies().set('rt', await generateRefreshToken(user.id), cookieOptions(20));

        // Revalidate cache for 'profile'
        revalidateTag('profile');

        return NextResponse.json({ message: 'Success signup' }, { status: 200 });

    } catch (error: any) {
        // Log the full error for debugging
        console.error('Error during signup:', error);

        // Handle different error types (e.g., unique constraint violation)
        if (error.code === 'P2002') {
            return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
        }

        // Default error response
        return NextResponse.json({ message: 'Failed to signup', error: error.message }, { status: 500 });
    }
};
