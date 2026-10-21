import postgres from "postgres";


  const database_url = process.env.DATABASE_URL;

  if (!database_url) 
    { throw new Error("DATABASE_URL mangler. Tjek din .env-fil.");
  }


const sql = postgres(database_url);

export { sql };