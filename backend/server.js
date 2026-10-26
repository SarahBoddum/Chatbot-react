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
  console.log("POST message-route blev kaldt");
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
  const userMessage = messages[0];

  const conversationHistory = await sql`
    SELECT * 
    FROM messages
    WHERE thread_id = ${threadId}
    ORDER BY created_at ASC
  `;
  const groqMessages = conversationHistory.map((message) =>{
    return {
      role: message.type === "bot" ? "assistant" : "user",
      content: message.content
    }
  });

  const systemPrompt = {
    role: "system",
    content: "You are a friendly and helpful chatbot. You answer clearly, use a warm tone, and explain things in a simple way."
  }

  groqMessages.unshift(systemPrompt);
  
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
  return res.status(500).json({
    error: "GROQ_API_KEY is missing",
  });
}

const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
   
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: groqMessages,
    }),

  }
);

if (!response.ok) {
  const errorDetails = await response.text();

  console.error("Groq API-fejl:", response.status, errorDetails);

  return res.status(502).json({
    error: "Groq API request failed",
    details: errorDetails,
  });
}

const data = await response.json();
const botContent = data.choices[0].message.content;


const botMessages = await sql`
  INSERT INTO messages (thread_id, type, content)
  VALUES (${threadId}, ${"bot"}, ${botContent})
  RETURNING id, thread_id, type, content, created_at
`;

const botMessage = botMessages[0];

res.status(201).json({
  userMessage,
  botMessage,
});

   
  } catch (error) {
    console.error("Fejl ved oprettelse af besked:", error);

    res.status(500).json({
      error: "Der opstod en fejl ved oprettelse af besked",
    });
  }
});

app.post("/api/test-groq", async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;

  // 1. Tjek om API-nøglen findes
  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is missing"
    });
  }

  // 2. Send request til Groq
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "user",
              content: "..."
            }
          ]
        })
      }
    );

    // 3. Tjek om Groq-requesten lykkedes
    if (!response.ok) {
      const errorData = await response.json();

      return res.status(response.status).json({
        error: errorData.error?.message || "Groq API request failed"
      });
    }

    // 4. Læs svaret fra Groq
    const data = await response.json();

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Groq request failed:", error);

    return res.status(500).json({
      error: "Could not connect to Groq"
    });
  }
});


app.delete("/api/threads/:id", async (req, res) => {
  const threadId = req.params.id;

  try {
    const deletedThreads = await sql`
      DELETE FROM threads
      WHERE id = ${threadId}
      RETURNING id
    `;

    if (deletedThreads.length === 0) {
      return res.status(404).json({
        error: "The thread was not found",
      });
    }

    return res.status(200).json({
      message: "Thread deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting thread:", error);

    return res.status(500).json({
      error: "Failed to delete thread",
    });
  }
});


app.listen(PORT, () => {
  console.log(`Serveren kører på http://localhost:${PORT}`);
});