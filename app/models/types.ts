export type Team = {
    alias: string;
    name: string;
    score: number;
    logo?: string;
}

export type Matchup = {
    home: Team;
    away: Team;
}

export type Match = {
    status: "scheduled" | "in_progress" | "completed";
    matchup: Matchup[];
    startTime: string;
    endTime?: string;
    totalGoal: number
};