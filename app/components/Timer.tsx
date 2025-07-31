import { useAtomValue } from "jotai";
import React from "react";
import { elapsedTimeAtom, matchAtom } from "../hooks/useScoreBoard";

type TimerProps = {
  startMatch: () => void;
  finishMatch: () => void;
};

function Timer({ startMatch, finishMatch }: TimerProps) {
  const match = useAtomValue(matchAtom);
  const elapsedTime = useAtomValue(elapsedTimeAtom);
  const seconds = Math.floor(elapsedTime.getTime() / 1000);
  const milliseconds = Math.floor(elapsedTime.getTime() % 1000);

  return (
    <div
      className={`relative h-20 w-full bg-linear-to-b from-gray-800 to-gray-900 transition-all duration-300 ease-out`}
    >
      <div
        className={`flex h-full w-full items-center justify-between gap-4 p-6 ${match?.status !== "scheduled" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex items-center gap-2">
          {match?.status === "in_progress" && (
            <>
              <div className="size-4 animate-pulse rounded-full bg-red-500" />
              <h2 className="text-2xl font-bold text-orange-400">{`${seconds.toString().padStart(2, "0")}.${milliseconds
                .toString()
                .padStart(3, "0")}`}</h2>
            </>
          )}
          {match?.status === "completed" && (
            <>
              <h2 className="text-2xl font-bold text-orange-400">
                Match Over!
              </h2>
            </>
          )}
        </div>
        <button
          id="finish_restart_button"
          onClick={match?.status === "in_progress" ? finishMatch : startMatch}
          className={`cursor-pointer rounded-full bg-orange-400 px-6 py-2 text-xl font-bold transition-all duration-150 ease-initial hover:scale-105 hover:bg-orange-300 active:scale-100 ${match?.status !== "scheduled" ? "translate-x-0" : "-translate-x-24"}`}
        >
          {match?.status === "in_progress" ? "FINISH" : "RESTART"}
        </button>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-out ${match?.status === "scheduled" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          id="start_match_button"
          onClick={startMatch}
          className={`cursor-pointer rounded-full bg-orange-400 px-6 py-2 text-xl font-bold transition-all duration-150 ease-initial hover:scale-105 hover:bg-orange-300 active:scale-100 ${match?.status === "scheduled" ? "translate-x-0" : "translate-x-24"}`}
        >
          START MATCH
        </button>
      </div>
    </div>
  );
}

export default Timer;
