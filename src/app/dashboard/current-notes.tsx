import clsx from 'clsx';
import { Note } from '@/lib/definitions';

export default async function CurrentNotes({
  currentNotes,
}: {
    currentNotes: Note[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Current Notes
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {currentNotes.map((note, i) => {
            return (
              <div
                key={note.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {note.id}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {note.note}
                </p>
              </div>
            );
          })}
        </div> 
      </div>
    </div>
  );
}
