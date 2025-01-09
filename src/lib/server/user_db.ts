import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { TURSO_DATABASE_URL,TURSO_AUTH_TOKEN } from '$env/static/private';

// Create the client
const client = createClient({
    url:TURSO_DATABASE_URL ,
    authToken:TURSO_AUTH_TOKEN,
  });

// Define the table schema

// Create the database instance
export const db = drizzle(client);

