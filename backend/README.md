# Chatbot Backend API

## Om projektet

Dette projekt indeholder backend-API'et til en chatbot. Backend er bygget med Node.js og Express og bruger en PostgreSQL-database til at hente og håndtere data om tråde og beskeder.

## Teknologier

- Node.js
- Express
- PostgreSQL
- `postgres` — databaseforbindelse
- `cors` — tillader requests fra frontend

## Installation og opstart

### 1. Installer dependencies

Gå ind i backend-mappen, og kør:

```bash
npm install
```

### 2. Konfigurer miljøvariabler

Opret en `.env`-fil i backend-mappen med de nødvendige miljøvariabler:

```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

Erstat `your_database_connection_string` med din PostgreSQL-databaseforbindelse.

**Vigtigt:** Del ikke din databaseforbindelse eller andre hemmelige nøgler offentligt.

### 3. Start backend-serveren

Kør følgende kommando i backend-mappen:

```bash
npm run dev
```

Serveren kører som standard på:

`http://localhost:3000`

## API Endpoints

### GET `/`

Returnerer en velkomstbesked fra API'et.

**Eksempel på response — `200 OK`:**

```json
{
  "message": "Velkommen til the chatbot to end the them all!!"
}
```

### GET `/api/test`

Kontrollerer, om API'et fungerer.

**Eksempel på response — `200 OK`:**

```json
{
  "message": "API virker!"
}
```

### GET `/api/threads`

Henter alle tråde fra databasen. Trådene sorteres efter oprettelsesdato, så de nyeste kommer først.

**Eksempel på response — `200 OK`:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Gruppechat",
    "created_at": "2026-10-20T10:00:00.000Z"
  }
]
```

Eksemplet viser strukturen af svaret. De faktiske værdier afhænger af databasen.

**Fejl — `500 Internal Server Error`:**

Returneres, hvis der opstår en server- eller databasefejl.

```json
{
  "error": "Der opstod en serverfejl ved hentning af tråde."
}
```

### GET `/api/threads/:id`

Henter information om en enkelt tråd ud fra dens ID.

**URL-parameter:**

| Parameter | Type | Beskrivelse |
|---|---|---|
| `id` | UUID | ID'et på den tråd, der skal hentes. |

**Eksempel på request:**

`GET /api/threads/123e4567-e89b-12d3-a456-426614174000`

**Success response — `200 OK`:**

Returnerer ét JSON-objekt med trådens information.

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Gruppechat",
  "created_at": "2026-10-20T10:00:00.000Z"
}
```

**Fejl — `404 Not Found`:**

Returneres, hvis tråden ikke findes.

```json
{
  "error": "Tråden blev ikke fundet"
}
```

**Fejl — `500 Internal Server Error`:**

Returneres, hvis der opstår en fejl under hentning af tråden.

```json
{
  "error": "Der opstod en fejl ved hentning af tråd"
}
```

### GET `/api/threads/:id/messages`

Henter alle beskeder, der tilhører en bestemt tråd. Beskederne sorteres efter `created_at` i stigende rækkefølge, så de ældste beskeder kommer først.

**URL-parameter:**

| Parameter | Type | Beskrivelse |
|---|---|---|
| `id` | UUID | ID'et på den tråd, hvis beskeder skal hentes. |

**Eksempel på request:**

`GET /api/threads/123e4567-e89b-12d3-a456-426614174000/messages`

**Success response — `200 OK`:**

Returnerer et JSON-array med beskeder.

```json
[
  {
    "id": "223e4567-e89b-12d3-a456-426614174000",
    "thread_id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "user",
    "content": "Hej alle!",
    "created_at": "2026-10-20T10:05:00.000Z"
  },
  {
    "id": "323e4567-e89b-12d3-a456-426614174000",
    "thread_id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "assistant",
    "content": "Hej! Hvad kan jeg hjælpe med?",
    "created_at": "2026-10-20T10:06:00.000Z"
  }
]
```

Eksemplet viser strukturen af svaret. De faktiske værdier afhænger af databasen.

**Ingen beskeder:**

Hvis der ikke findes beskeder for tråden, returnerer endpointet et tomt array med status `200 OK`.

```json
[]
```

**Fejl — `500 Internal Server Error`:**

Returneres, hvis der opstår en server- eller databasefejl under hentning af beskeder.

```json
{
  "error": "Der opstod en fejl ved hentning af beskeder"
}
```

## Testing

Du kan teste API'et med enten `curl` i terminalen eller direkte i en browser.

### Forberedelse

1. Start backend-serveren med `npm run dev`.
2. Kontrollér, at serveren kører på `http://localhost:3000`.
3. Find et gyldigt tråd-ID (UUID) i databasen.

**Bemærk:** Erstat `{id}` i nedenstående eksempler med et faktisk UUID. De krøllede parenteser skal ikke med i den endelige URL.

### Test med curl

**Hent alle tråde:**

```bash
curl -i http://localhost:3000/api/threads
```

**Hent en bestemt tråd:**

```bash
curl -i http://localhost:3000/api/threads/{id}
```

**Hent beskeder for en bestemt tråd:**

```bash
curl -i http://localhost:3000/api/threads/{id}/messages
```

Flaget `-i` viser HTTP-statuskoden og response-headers sammen med svaret.

### Test i browseren

Åbn disse URL'er i browseren, og erstat `{id}` med et gyldigt UUID:

1. Alle tråde: `http://localhost:3000/api/threads`
2. En bestemt tråd: `http://localhost:3000/api/threads/{id}`
3. Beskeder for en bestemt tråd: `http://localhost:3000/api/threads/{id}/messages`

Kontrollér, at:

- `/api/threads` returnerer et array af tråde.
- `/api/threads/:id` returnerer ét trådobjekt.
- `/api/threads/:id/messages` returnerer et array af beskeder eller `[]`, hvis der ikke er nogen beskeder.
- Et ikke-eksisterende tråd-ID giver `404 Not Found` på `/api/threads/:id`.

### Fejlfinding

Hvis du ikke kan forbinde til API'et:

- Kontrollér, at backend-serveren stadig kører.
- Kontrollér, at `PORT` matcher den port, du bruger i URL'en.
- Kontrollér, at `DATABASE_URL` er korrekt konfigureret.
- Kontrollér terminalen for server- eller databasefejl.

## Projektstruktur

En forenklet oversigt over backend-mappen:

```text
backend/
├── .env
├── package.json
├── db.js
└── server.js
```

- `db.js` opretter forbindelsen til PostgreSQL-databasen.
- `server.js` indeholder Express-serveren og API-endpoints.
- `.env` indeholder miljøvariabler til lokal udvikling og bør ikke deles offentligt.