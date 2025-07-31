import ScoreBoard from "./components/ScoreBoard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-gray-100 to-gray-200 p-8 font-sans">
      <ScoreBoard />
    </div>
  );
}
