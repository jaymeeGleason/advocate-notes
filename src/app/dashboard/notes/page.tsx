import CreateNote from './create-note';
import { getAdvocates } from '@/lib/data';

export default async function Page() {
  const advocates = await getAdvocates();

  return <main>
    <p>Notes Page</p>
    <CreateNote advocates={advocates}/>
  </main>
  }