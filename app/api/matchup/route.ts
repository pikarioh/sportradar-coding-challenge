import { Matchup } from "@/app/models/types";
import { NextResponse } from "next/server";

export async function GET() {
    const matchup: Matchup[] = [
        {
            home: {
                alias: "GER",
                name: "Germany",
                score: 0,
                logo: "/ger.png",
            },
            away: {
                alias: "POL",
                name: "Poland",
                score: 0,
                logo: "/pol.png",
            },
        },
        {
            home: {
                alias: "BRA",
                name: "Brazil",
                score: 0,
                logo: "/bra.png",
            },
            away: {
                alias: "MEX",
                name: "Mexico",
                score: 0,
                logo: "/mex.png",
            },
        },
        {
            home: {
                alias: "ARG",
                name: "Argentina",
                score: 0,
                logo: "/arg.png",
            },
            away: {
                alias: "URU",
                name: "Uruguay",
                score: 0,
                logo: "/uru.svg",
            },
        },
    ]

    return NextResponse.json(matchup);
}