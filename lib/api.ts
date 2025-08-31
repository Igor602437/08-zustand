import { NewNote, Note } from '@/types/note';
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  query: string = '',
  tag?: string
): Promise<FetchNotesResponse> {
  const axiosOptions = {
    params: {
      perPage: 12,
      page,
      search: query,
      ...(tag ? { tag } : {}),
    },
  };

  const response = await axios.get<FetchNotesResponse>('/notes', axiosOptions);

  return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);

  return response.data;
};

export async function createNote(values: NewNote): Promise<Note> {
  const response = await axios.post<Note>('/notes', values);

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`);

  return response.data;
}
