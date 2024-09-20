import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "~/service/user.service";
import { prisma } from "~/utils/utils";

export const GET = async (req: NextRequest) => {
    try {
        const accessToken = req.cookies.get("access_token")?.value;
        const currentUser = await getCurrentUser(accessToken);

        if (!currentUser) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const page = req.nextUrl.searchParams.get("page");

        // Get the total count of projects
        const totalProjects = await prisma.dubbingProject.count({
            where: {
                userId: currentUser.id,
            },
        });

        // Get the projects for the current page
        const projects = await prisma.dubbingProject.findMany({
            where: {
                userId: currentUser.id,
            },
            take: 6,
            skip: 6 * (Number(page) - 1),
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ projects, totalProjects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};
