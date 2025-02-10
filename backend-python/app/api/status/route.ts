import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
    //gets the query id and returns its status
    const data = await req.json();
    const queryId = data.queryId;

    const result = await prisma.result.findFirst({
        where: {
            queryId: queryId,
        },
    });

    //if the query id is not found, return a 404 status
    if (!result) {
        return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, result });




}

