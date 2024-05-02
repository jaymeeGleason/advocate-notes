'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    advocateId: z.string(),
    note: z.string(),
    date: z.string(),
});
 
const CreateNote = FormSchema.omit({ id: true, date: true });
const UpdateNote = FormSchema.omit({ id: true, date: true });

export async function createNote(formData: FormData) {
    const { advocateId, note } = CreateNote.parse({
        advocateId: formData.get('advocateId'),
        note: formData.get('note')
    });
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO notes (advocate_id, note, date)
    VALUES (${advocateId}, ${note}, ${date})
  `;
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateNote(id: string, formData: FormData) {
    const { advocateId, note } = UpdateNote.parse({
        advocateId: formData.get('advocateId'),
        note: formData.get('note')
    });

    await sql`
    UPDATE notes
    SET advocate_id = ${advocateId}, note = ${note}
    WHERE id = ${id}
  `;
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteNote(id: string) {
    await sql`DELETE FROM notes WHERE id = ${id}`;
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }