import NoteTable from './note-table';
export default async function Page() {
    return <main>
        <p className="text-2xl">Current Notes</p>
        <NoteTable/>
    </main>
  }