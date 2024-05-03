import { sql } from '@vercel/postgres';
import {
  Note,
  Advocate,
} from './definitions';

export async function getNotes() {
    try {
        const data = await sql<Note>`SELECT * FROM notes`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch notes.');
    }
}

export async function getNote(id: string) {
    try {
        const data = await sql<Note>`SELECT * FROM notes where id = ${id}`;
        console.log(data);
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch note.');
    }
}

export async function getAdvocates() {
    try {
        const data = await sql<Advocate>`SELECT * FROM advocates`;
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch advocates.');
    }
}

export async function getAdvocateNotes(advocateId: string) {
    try {
      const data = await sql<Note>`SELECT * FROM notes WHERE advocate_id = ${advocateId}`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch notes.');
    }
  }

export async function getAdvocate(email: string) {
    try {
        const advocate = await sql<Advocate>`SELECT * FROM advocates WHERE email=${email}`;
        return advocate.rows[0] as Advocate;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch advocate.');
    }
}


const ITEMS_PER_PAGE = 5;
export async function getFilteredNotes(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const notes = await sql<Note>`
      SELECT
        notes.id,
        notes.note,
        notes.date
      FROM notes
      WHERE
        notes.date::text ILIKE ${`%${query}%`} OR
        notes.note ILIKE ${`%${query}%`}
      ORDER BY notes.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return notes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch notes.');
  }
}

export async function getNotePages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM notes
    WHERE
      notes.date::text ILIKE ${`%${query}%`} OR
      notes.note ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of notes.');
  }
}



