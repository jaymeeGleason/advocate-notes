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

export async function createInvoice(formData: FormData) {
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