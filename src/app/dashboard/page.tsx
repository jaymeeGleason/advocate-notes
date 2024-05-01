import { getNotes } from '@/app/lib/data';
import Notes from './current-notes';

export default async function Page() {
    const notes = await getNotes();
    return <main>
        <h1>Dashboard</h1>
        <div>Welcome to Advocate Notes Application</div>
        <Notes currentNotes={notes}/>
    </main>
  }