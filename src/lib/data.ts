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
        throw new Error('Failed to fetch note.');
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
      throw new Error('Failed to fetch note.');
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


