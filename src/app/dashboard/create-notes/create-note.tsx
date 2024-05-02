import { Advocate } from '@/lib/definitions';
import Link from 'next/link';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/common/button';
import { createNote } from '@/lib/actions';

export default function Form({ advocates }: { advocates: Advocate[] }) {
  return (
    <form action={createNote}> 
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* advocate Name */}
        <div className="mb-4">
          <label htmlFor="advocate" className="mb-2 block text-sm font-medium">
            Choose advocate
          </label>
          <div className="relative">
            <select
              id="advocate"
              name="advocateId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select an advocate
              </option>
              {advocates.map((advocate) => (
                <option key={advocate.id} value={advocate.id}>
                  {advocate.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="note" className="mb-2 block text-sm font-medium">
            Enter a note
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="note"
                name="note"
                type="text"
                placeholder="Enter your note"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Note</Button>
      </div>
    </form>
  );
}
