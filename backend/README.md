# Backend API for the Chatbot

This backend powers the chatbot application by handling thread and message storage in PostgreSQL and sending conversation history to Groq for AI-generated replies.

The project is built with Node.js and Express.

## Tech stack

- Node.js
- Express
- PostgreSQL
- `postgres`
- `cors`

## Project structure

```text
backend/
├── db.js
├── README.md
├── package.json
├── server.js
├── .env
├── .env.example
```

## Requirements

Before starting the backend, make sure you have:

- Node.js installed
- A PostgreSQL database available
- A valid `DATABASE_URL`
- A valid `GROQ_API_KEY`

## Environment variables

Create a `.env` file in the `backend/` folder.

Example:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[PASSWORD]@[HOST]:5432/postgres
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
```

Notes:

- `DATABASE_URL` is required to connect to PostgreSQL
- `PORT` is optional and defaults to `3000`
- `GROQ_API_KEY` is required for AI responses

A sample file is available in `.env.example`.

## Installation

From the `backend` folder, run:

```bash
npm install
```

## Run locally

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The backend runs on:

```text
http://localhost:3000
```

## Database connection

The PostgreSQL client is created in `db.js`:

```js
import postgres from "postgres";

const database_url = process.env.DATABASE_URL;

if (!database_url) {
  throw new Error("DATABASE_URL mangler. Tjek din .env-fil.");
}

const sql = postgres(database_url);

export { sql };
```

This connection is used throughout `server.js` for fetching and saving data.

## API endpoints

### GET /

Returns a welcome message.

Example response:

```json
{
  "message": "Velkommen til the chatbot to end the them all!!"
}
```

### GET /api/threads

Returns all threads sorted by newest first.

Example response:

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "My thread",
    "created_at": "2026-10-20T10:00:00.000Z"
  }
]
```

### GET /api/threads/:id

Returns one thread by ID.

Example response:

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "My thread",
  "created_at": "2026-10-20T10:00:00.000Z"
}
```

### GET /api/threads/:id/messages

Returns all messages in a thread ordered by creation time ascending.

Example response:

```json
[
  {
    "id": "223e4567-e89b-12d3-a456-426614174000",
    "thread_id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "user",
    "content": "Hello!",
    "created_at": "2026-10-20T10:05:00.000Z"
  },
  {
    "id": "323e4567-e89b-12d3-a456-426614174000",
    "thread_id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "bot",
    "content": "Hi! How can I help?",
    "created_at": "2026-10-20T10:06:00.000Z"
  }
]
```

### POST /api/threads

Creates a new thread and inserts the first user message in the same request.

This is a compound operation: it creates both a row in the `threads` table and a row in the `messages` table.

Request body:

```json
{
  "title": "My first thread",
  "content": "Hello from the user"
}
```

Required fields:

- `title`: required string, cannot be empty or whitespace only
- `content`: required string, cannot be empty or whitespace only

Behavior:

1. Validates that `title` is a non-empty string.
2. Validates that `content` is a non-empty string.
3. Inserts a new thread with the provided title.
4. Inserts the first user message linked to the new thread.
5. Returns the created thread and message objects.

Example success request:

```bash
curl -X POST http://localhost:3000/api/threads \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first thread",
    "content": "Hello from the user"
  }'
```

Success response — `201 Created`:

```json
{
  "thread": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "My first thread",
    "created_at": "2026-10-20T10:00:00.000Z"
  },
  "message": {
    "id": "223e4567-e89b-12d3-a456-426614174000",
    "thread_id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "user",
    "content": "Hello from the user",
    "created_at": "2026-10-20T10:05:00.000Z"
  }
}
```

Validation errors:

If `title` is missing or empty:

```bash
curl -X POST http://localhost:3000/api/threads \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello from the user"
  }'
```

Response:

```json
{
  "error": "Title is required"
}
```

If `content` is missing or empty:

```bash
curl -X POST http://localhost:3000/api/threads \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My first thread"
  }'
```

Response:

```json
{
  "error": "Content is required"
}
```

If values are empty strings or whitespace-only:

```bash
curl -X POST http://localhost:3000/api/threads \
  -H "Content-Type: application/json" \
  -d '{
    "title": "   ",
    "content": "   "
  }'
```

Response:

```json
{
  "error": "Title is required"
}
```

or

```json
{
  "error": "Content is required"
}
```

Note: this endpoint is a compound operation because the request creates both a thread and the first message in the same flow. If either insert fails, the request is treated as a server error.

### POST /api/threads/:id/messages

Creates a new message in an existing thread.

Request body:

```json
{
  "type": "user",
  "content": "Tell me a joke"
}
```

Example request:

```bash
curl -X POST http://localhost:3000/api/threads/123e4567-e89b-12d3-a456-426614174000/messages \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user",
    "content": "Tell me a joke"
  }'
```

### DELETE /api/threads/:id

Deletes a thread by ID.

This endpoint removes the thread from the `threads` table.

URL parameter:

- `id`: ID of the thread to delete

Example request:

```bash
curl -X DELETE http://localhost:3000/api/threads/123e4567-e89b-12d3-a456-426614174000
```

Success response — `200 OK`:

```json
{
  "message": "Thread deleted successfully"
}
```

If the thread does not exist, the endpoint returns `404 Not Found`:

```json
{
  "error": "The thread was not found"
}
```

If a database or server error occurs, the endpoint returns `500 Internal Server Error`:

```json
{
  "error": "Failed to delete thread"
}
```

## Groq integration

The backend sends requests to:

```text
https://api.groq.com/openai/v1/chat/completions
```

The current model configured in the project is:

```text
openai/gpt-oss-20b
```

The request is built like this:

```js
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
```

## Troubleshooting

### Backend does not start

Check:

- `DATABASE_URL` exists in `.env`
- the PostgreSQL database is reachable
- dependencies are installed

### Messages are saved but no bot reply appears

Check:

- `GROQ_API_KEY` is valid
- the Groq model is available for your account
- the backend logs show any Groq errors

### API returns 500 errors

Check:

- SQL queries are valid
- table names match your database schema
- your database connection string is correct

## Example test commands

Get all threads:

```bash
curl http://localhost:3000/api/threads
```

Get one thread:

```bash
curl http://localhost:3000/api/threads/{id}
```

Get messages for one thread:

```bash
curl http://localhost:3000/api/threads/{id}/messages
```

Send a message:

```bash
curl -X POST http://localhost:3000/api/threads/{id}/messages \
  -H "Content-Type: application/json" \
  -d '{"type":"user","content":"Hello from curl"}'
```

Check Groq connection:

```bash
curl http://localhost:3000/api/test-groq
```
