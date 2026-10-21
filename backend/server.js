import express from "express";
import cors from "cors";
import { sql } from "./db.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

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
    res.status(500).json({
      error: "Der opstod en serverfejl ved hentning af tråde."
    });
  }
});

app.get("/api/threads/:id", async (req, res ) => {
  const threadId = req.params.id;

  try{
    const threads = await sql`
        SELECT id, title, created_at
        FROM threads
        WHERE id = ${threadId}
      `;
      res.json(threads[0]);
  } catch (error) {
    console.error("Fejl ved hentning af tråd:", error);

    res.status(500).json({
      error: "Der opstod en fejl ved hentning af tråd"
    });
  }
});

app.get("/api/threads/:id/messages", async (req, res) => {
    const threadId = req.params.id;

  try{
    const messages = await sql`
        SELECT id, thread_id, type, content, created_at
        FROM messages
        WHERE thread_id = ${threadId}
        ORDER BY created_at ASC
      `;
      res.json(messages);
  } catch (error) {
      console.error("Fejl ved hentning af beskeder", error);
      res.status(500).json({
        error: "Fejl ved hentning af beskeder"
      });
  }
});

app.post("/api/threads/:id/messages", async (req, res) => {
  const threadId = req.params.id;
  const { type, content } = req.body;

  // Check that required fields are present
  if (!type || !content) {
    return res.status(400).json({
      error: "Both 'type' and 'content' are required",
    });
  }

  try {
    const messages = await sql`
      INSERT INTO messages (thread_id, type, content)
      VALUES (${threadId}, ${type}, ${content})
      RETURNING id, thread_id, type, content, created_at
    `;

    res.status(201).json(messages[0]);
  } catch (error) {
    console.error("Fejl ved oprettelse af besked:", error);

    res.status(500).json({
      error: "Der opstod en fejl ved oprettelse af besked",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveren kører på http://localhost:${PORT}`);
});