import { deleteNote } from '@/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
 
export function DeleteNote({ id }: { id: string }) {
  const deleteNoteWithId = deleteNote.bind(null, id);
 
  return (
    <form action={deleteNoteWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}