'use server';

import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '../../auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    advocateId: z.string(),
    note: z.string(),
    date: z.string(),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
 
const CreateNote = FormSchema.omit({ id: true, date: true });
const UpdateNote = FormSchema.omit({ id: true, date: true });

export async function createNote(formData: FormData) {
    const { advocateId, note } = CreateNote.parse({
        advocateId: formData.get('advocateId'),
        note: formData.get('note')
    });
    const date = new Date().toISOString().split('T')[0];
try {
    await sql`
    INSERT INTO notes (advocate_id, note, date)
    VALUES (${advocateId}, ${note}, ${date})
  `;
 } catch (error) {
    return {
      message: 'Database Error: Failed to Create Note.',
    };
  }
    
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateNote(id: string, formData: FormData) {
    const { advocateId, note } = UpdateNote.parse({
        advocateId: formData.get('advocateId'),
        note: formData.get('note')
    });
    try {
        await sql`
        UPDATE notes
        SET advocate_id = ${advocateId}, note = ${note}
        WHERE id = ${id}
      `;
    } catch (error) {
       return {
         message: 'Database Error: Failed to Update Note.',
       };
    }
    
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function deleteNote(id: string) {
    try {
        await sql`DELETE FROM notes WHERE id = ${id}`;
    } catch (error) {
       return {
         message: 'Database Error: Failed to Delete Note.',
       };
    }
    
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }