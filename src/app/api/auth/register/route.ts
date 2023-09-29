import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // log request body to app/logs/request
    const body = await request.json();
    console.log(body);

    return NextResponse.json({message: 'test'})
}

// export async function GET(request: NextRequest) {
//     return NextResponse.json({message: 'test'})
// }   