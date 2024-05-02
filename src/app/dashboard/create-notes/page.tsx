import CreateNote from './create-note';
import { getAdvocates } from '@/lib/data';

export default async function Page() {
  const advocates = await getAdvocates();

  return <main>
    <p className="text-2xl">Create a New Note</p>
    <CreateNote advocates={advocates}/>
  </main>
  }