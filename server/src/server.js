import express from "express";

const PORT = 8080;

const app = express();

// Liveness check
app.get(`/health`, (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Serving from ${PORT}`);
});
