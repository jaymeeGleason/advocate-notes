import { UpdateNote, DeleteNote } from '@/app/dashboard/buttons';
import { formatDateToLocal } from '@/lib/utils';
import { getNotes } from '@/lib/data';

export default async function NotesTable() {
  const notes = await getNotes();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {notes?.map((note) => (
              <div
                key={note.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
               
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(note.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateNote id={note.id} />
                    <DeleteNote id={note.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Note
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {notes?.map((note) => (
                <tr
                  key={note.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {note.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {note.note}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(note.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateNote id={note.id} />
                      <DeleteNote id={note.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
