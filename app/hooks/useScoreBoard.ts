import { useEffect, useRef, useState } from "react";
import { Match, Matchup } from "../models/types";
import { atom, useAtom } from "jotai";

export const matchAtom = atom<Match | null>(null)
export const elapsedTimeAtom = atom<Date>(new Date(0));

export const useScoreBoard = () => {
  const [match, setMatch] = useAtom(matchAtom);
  const [elapsedTime, setElapsedTime] = useAtom(elapsedTimeAtom);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const lastGoalSecondRef = useRef<number | null>(null);

  const fetchMatchup = async () => {
    try {
      const response = await fetch("/api/matchup");
      if (!response.ok) {
        throw new Error("Failed to fetch matchup data");
      }
      const data: Matchup[] = await response.json();
      setMatch({ matchup: data, status: "scheduled" } as Match);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  const scoreRandomGoal = () => {
    if (!match || !match.matchup || match.matchup.length === 0) return;

    const randomizedMatch = Math.floor(Math.random() * (match?.matchup?.length ?? 0)); // Select a random matchup
    const randomizedTeam = Math.floor(Math.random() * 2) === 0 ? 'home' : 'away';

    const updatedMatchup = match.matchup.map((m, index) => {
      if (index !== randomizedMatch) return m;
      const teams = { ...m };
      const updatedTeams = teams[randomizedTeam].score++;
      return { ...m, updatedTeams };
    });

    setMatch(prevGame => {
      if (!prevGame) return prevGame;
      return { ...prevGame, matchup: updatedMatchup, totalGoal: prevGame.totalGoal + 1 };
    });
  }

  const resetScore = () => {
    if (!match || !match.matchup) return;
    const resetMatchup = match.matchup.map((m) => ({
      ...m,
      home: { ...m.home, score: 0 },
      away: { ...m.away, score: 0 },
    }));
    setMatch((prevGame) => prevGame ? ({ ...prevGame, matchup: resetMatchup, totalGoal: 0 }) : null);
  };

  useEffect(() => {
    fetchMatchup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync updateElapsedTime with screen framerate when game is in progress
  useEffect(() => {
    if (match === null || match.status !== "in_progress") {
      return;
    }
    // Use requestAnimationFrame for smoother updates
    let animationFrameId: number;
    const startTime = match.startTime ? new Date(match.startTime).getTime() : null;
    const endTime = match.endTime ? new Date(match.endTime).getTime() : null;

    const updateElapsedTime = () => {
      if (startTime !== null && endTime !== null) {
        const currentTime = Date.now();
        const elapsed = Math.min(currentTime, endTime) - startTime;
        setElapsedTime(new Date(elapsed));
        // Stop updating if currentTime >= endTime
        if (currentTime > endTime) {
          scoreRandomGoal();
          setElapsedTime(new Date(0));
          setMatch(prev => prev ? { ...prev, status: "completed" } : null);
          return;
        }
        animationFrameId = requestAnimationFrame(updateElapsedTime);
      }
    };

    animationFrameId = requestAnimationFrame(updateElapsedTime);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  useEffect(() => {
    if (!match) return;
    if (match.status !== "in_progress") {
      lastGoalSecondRef.current = null;
      return;
    };
    const seconds = Math.floor(elapsedTime.getTime() / 1000);
    if (
      seconds > 0 &&
      seconds % 10 === 0 &&
      lastGoalSecondRef.current !== seconds
    ) {
      scoreRandomGoal();
      lastGoalSecondRef.current = seconds;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsedTime, match]);

  const startMatch = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/start");
      if (!response.ok) {
        throw new Error("Failed to fetch game time");
      }
      const data = await response.json();
      setMatch({
        startTime: data.startTime,
        endTime: data.endTime,
        status: "in_progress",
        matchup: match?.matchup || [],
      } as Match);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      )
    } finally {
      resetScore()
      setLoading(false);
    }

  }

  const finishMatch = async () => {
    const timeRemaining = match?.endTime ? new Date(match.endTime).getTime() - Date.now() : 0;
    if (timeRemaining > 0) {
      const secondsLeft = Math.floor(timeRemaining / 1000);
      const goalsToScore = Math.floor(secondsLeft / 10) + 1;
      for (let i = 0; i < goalsToScore; i++) {
        scoreRandomGoal();
      }
    }
    setMatch(prev => prev ? { ...prev, status: "completed" } : null);
  };



  return { error, loading, startMatch, finishMatch };
};
