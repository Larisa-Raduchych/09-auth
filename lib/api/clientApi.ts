import axios from "axios";
import type { Note, NoteTag } from "@/types/note";
import { nextApi } from "./api";
import type { User } from "@/types/user";

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await notehubApi.get<FetchNotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  });
  return response.data;
};

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await notehubApi.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubApi.get<Note>(`/notes/${id}`);
  return response.data;
};

interface UserDataToRegister {
  email: string;
  password: string;
}

export async function register(userData: UserDataToRegister): Promise<User> {
  const response = await nextApi.post<User>("/auth/register", userData);
  return response.data;
}

export async function login(userData: UserDataToRegister): Promise<User> {
  const response = await nextApi.post<User>("/auth/login", userData);
  return response.data;
}
