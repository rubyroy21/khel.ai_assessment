import React, { useEffect, useState } from "react";

const Scoreboard = () => {
  const [matchState, setMatchState] = useState({ innings: [] });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMatchState(data);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Cricket Score</h1>
      {matchState.innings.map((inning, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <h2 className="text-xl font-semibold">{inning.team}</h2>
          <p>Runs: {inning.runs}</p>
          <p>Wickets: {inning.wickets}</p>
          <p>Overs: {inning.overs}</p>
          <p>Run Rate: {inning.runRate}</p>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;
