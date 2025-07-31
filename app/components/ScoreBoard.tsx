/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { matchAtom, useScoreBoard } from "../hooks/useScoreBoard";
import Timer from "./Timer";
import { useAtomValue } from "jotai";

function ScoreBoard() {
  const match = useAtomValue(matchAtom);
  const { error, loading, startMatch, finishMatch } = useScoreBoard();

  return (
    <div className="w-full max-w-[36rem] min-w-96 overflow-hidden rounded-2xl bg-gray-50 shadow-lg">
      <Timer startMatch={startMatch} finishMatch={finishMatch} />

      <div className="flex h-full w-full flex-col items-center gap-2 p-4">
        {match?.matchup?.map((matchup) => (
          <div
            key={matchup.home.alias + "-" + matchup.away.alias}
            className="flex h-14 w-full items-center gap-2 rounded-xl bg-white p-2 shadow"
          >
            <img
              className="flex aspect-video h-full flex-0 rounded-lg bg-gray-200 object-cover"
              src={matchup.home.logo}
              alt={matchup.home.name + " Flag"}
            />
            <div className="flex flex-1 flex-col">
              <h1 className="text-xs leading-3">{matchup.home.name}</h1>
              <h2 className="text-xl leading-5 font-bold">
                {matchup.home.alias}
              </h2>
            </div>
            <div
              key={matchup.home.alias + "-" + matchup.home.score}
              className={`flex aspect-square h-full items-center justify-center rounded-lg ${match.status === "in_progress" ? "animate-[trigger_1s_ease-out_forwards] bg-orange-400" : "bg-gray-100"} text-2xl font-bold shadow transition-colors duration-300 ease-out`}
            >
              {matchup.home.score}
            </div>
            <div
              key={matchup.away.alias + "-" + matchup.away.score}
              className={`flex aspect-square h-full items-center justify-center rounded-lg ${match.status === "in_progress" ? "animate-[trigger_1s_ease-out_forwards] bg-orange-400" : "bg-gray-100"} text-2xl font-bold shadow transition-colors duration-300 ease-out`}
            >
              {matchup.away.score}
            </div>
            <div className="flex flex-1 flex-col items-end">
              <h1 className="text-xs leading-3">{matchup.away.name}</h1>
              <h2 className="text-xl leading-5 font-bold">
                {matchup.away.alias}
              </h2>
            </div>
            <img
              className="flex aspect-video h-full flex-0 rounded-lg bg-gray-200 object-cover"
              src={matchup.away.logo}
              alt={matchup.away.name + " Flag"}
            />
          </div>
        ))}

        <div className="flex w-full items-center justify-between">
          <span
            className={`text-xs transition-opacity duration-300 ease-out ${error ? "text-red-500" : "text-gray-500"}`}
          >
            {error && `Error: ${error}`}
            {loading && "Loading..."}
          </span>

          <span
            data-testid="total_score_display"
            className={`text-xs transition-opacity duration-300 ease-out`}
          >
            {match?.status === "scheduled" &&
              "Press START MATCH to begin the match simulation"}
            {match?.status !== "scheduled" &&
              match &&
              `Total Goals: ${match.totalGoal}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
