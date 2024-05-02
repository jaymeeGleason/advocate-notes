export type Advocate = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  
  export type Note = {
    id: string;
    advocate_id: string;
    note: string;
    date: string;
  };
  
  export type AdvocateNotesTable = {
    id: string;
    advocate_id: string;
    name: string;
    email: string;
    note: string;
    date: string;
  };

  export type NoteForm = {
    id: string;
    advocate_id: string;
    note: string;
  };
  
  
