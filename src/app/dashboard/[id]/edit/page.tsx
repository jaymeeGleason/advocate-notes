import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/common/button';
import { getNote, getAdvocates } from '@/lib/data';
import { updateNote } from '@/lib/actions';

export default async function EditNoteForm( {params }: { params: { id: string } }) {
    const notes = await getNote(params.id);
    const note = notes[0];
    const advocates = await getAdvocates();
    const updateInvoiceWithId = updateNote.bind(null, note.id);

    return (
        <form action={updateInvoiceWithId}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className="mb-4">
            <label htmlFor="advocate" className="mb-2 block text-sm font-medium">
                Choose advocate
            </label>
            <div className="relative">
                <select
                id="advocate"
                name="advocateId"
                className="peer block flex-1 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={note.advocate_id}
                required
                >
                <option value="" disabled>
                    Select a advocate
                </option>
                {advocates.map((advocate) => (
                    <option key={advocate.id} value={advocate.id}>
                    {advocate.name}
                    </option>
                ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] flex-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            </div>

            <div className="mb-4">
            <label htmlFor="note" className="mb-2 block text-sm font-medium">
                Choose an note
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                <textarea
                    id="note"
                    name="note"
                    defaultValue={note.note}
                    placeholder="Enter Note"
                    className="peer block flex-1 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    minLength={20}
                    maxLength={300}
                    required
                />
                </div>
            </div>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <Link
            href="/dashboard/notes"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
            Cancel
            </Link>
            <Button type="submit">Edit Note</Button>
        </div>
        </form>
    );
}
