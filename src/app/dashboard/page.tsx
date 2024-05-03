import NoteTable from './note-table';
import Pagination from '@/app/common/pagination';
import Search from '@/app/common/search';
import { CreateNote } from '@/app/dashboard/buttons';
import { getNotePages } from '@/lib/data';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const totalPages = await getNotePages(query);
    const currentPage = Number(searchParams?.page) || 1;
    
  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className={`text-2xl`}>Notes</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search notes..." />
            <CreateNote />
        </div>
        <NoteTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} /> 
        </div>
    </div>
  );
}