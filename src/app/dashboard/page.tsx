import { getNotes } from '@/lib/data';
import Notes from './current-notes';

export default async function Page() {
    const notes = await getNotes();
    return <main>
        <Notes currentNotes={notes}/>
    </main>
  }