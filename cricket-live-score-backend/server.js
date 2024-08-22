const express = require("express");
const cors = require("cors");
const { WebSocketServer } = require("ws");

const app = express();
app.use(cors());
app.use(express.json());

let matchState = {
  innings: [
    {
      team: "Team A",
      runs: 120,
      wickets: 5,
      overs: "15.4",
      runRate: 7.65,
    },
    {
      team: "Team B",
      runs: 99,
      wickets: 2,
      overs: "15.0",
      runRate: 0,
    },
  ],
};

// WebSocket Server for real-time updates
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(matchState));

  ws.on("message", (message) => {
    const updatedState = JSON.parse(message);
    matchState = updatedState;

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(matchState));
      }
    });
  });
});

app.get("/api/match", (req, res) => {
  res.json(matchState);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
