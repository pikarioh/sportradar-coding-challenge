import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 90000).toISOString(), // 90 seconds later
    });
}