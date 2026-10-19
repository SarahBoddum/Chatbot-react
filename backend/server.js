import express from "express";
import cors from "cors";
import { sql } from "./db.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Velkommen til the chatbot to end the them all!!"
  });
});

app.get("/api/threads", async (req, res) => {
  try {
    const threads = await sql`
      SELECT id, title, created_at
      FROM threads
      ORDER BY created_at DESC
    `;

    res.json(threads);
  } catch (error) {
    console.error("Fejl ved hentning af threads:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API virker!" });
});

app.listen(PORT, () => {
  console.log(`Serveren kører på http://localhost:${PORT}`);
});