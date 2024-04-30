const { db } = require('@vercel/postgres');
const {
  advocates,
  notes
} = require('../src/app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedAdvocates(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "advocates" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS advocates (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "advocates" table`);

    // Insert data into the "advocates" table
    const insertedAdvocates = await Promise.all(
      advocates.map(async (advocate) => {
        const hashedPassword = await bcrypt.hash(advocate.password, 10);
        return client.sql`
        INSERT INTO advocates (id, name, email, password)
        VALUES (${advocate.id}, ${advocate.name}, ${advocate.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedAdvocates.length} advocates`);

    return {
      createTable,
      advocates: insertedAdvocates,
    };
  } catch (error) {
    console.error('Error seeding advocates:', error);
    throw error;
  }
}

async function seedNotes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "notes" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    advocate_id UUID NOT NULL,
    note VARCHAR(1000) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "notes" table`);

    // Insert data into the "notes" table
    const insertedNotes = await Promise.all(
      notes.map(
        (note) => client.sql`
        INSERT INTO notes (advocate_id, note, date)
        VALUES (${note.advocate_id}, ${note.note}, ${note.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedNotes.length} notes`);

    return {
      createTable,
      notes: insertedNotes,
    };
  } catch (error) {
    console.error('Error seeding notes:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedAdvocates(client);
  await seedNotes(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
