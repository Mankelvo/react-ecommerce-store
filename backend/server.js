import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Mankelvo Market API",
    message: "Backend is running successfully"
  });
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Mankelvo API running on port ${PORT}`);
});