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
├── [db.js](http://_vscodecontentref_/1)
├── [README.md](http://_vscodecontentref_/2)
├── [package.json](http://_vscodecontentref_/3)
├── [server.js](http://_vscodecontentref_/4)
├── .env
├── [.env.example](http://_vscodecontentref_/5)

### DELETE /api/threads/:id

Deletes a thread by ID.

This endpoint removes the thread from the `threads` table.

URL parameter:

- `id`: ID of the thread to delete

Example request:

```bash
DELETE /api/threads/123e4567-e89b-12d3-a456-426614174000