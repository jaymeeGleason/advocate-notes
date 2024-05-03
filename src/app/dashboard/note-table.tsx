import { UpdateNote, DeleteNote } from '@/app/dashboard/buttons';
import { formatDateToLocal } from '@/lib/utils';
import { getFilteredNotes } from '@/lib/data';

export default async function NotesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const notes = await getFilteredNotes(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
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
                  <td className="text-wrap px-3 py-3">
                    {note.id}
                  </td>
                  <td className="text-wrap">
                    {note.note}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(note.date)}
                  </td>
                  <td className="text-wrap py-3 pl-6 pr-3">
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
