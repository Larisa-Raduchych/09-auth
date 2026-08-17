import type { Note, NoteTag } from "@/types/note";
import { nextApi } from "./api";
import type { User } from "@/types/user";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string,
): Promise<FetchNotesResponse> => {
  const response = await nextApi.get<FetchNotesResponse>("/notes", {
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
  const response = await nextApi.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextApi.get<Note>(`/notes/${id}`);
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

export async function logout(): Promise<void> {
  await nextApi.post("/auth/logout");
}

// type CheckSessionResponse = {
//   success: boolean;
// };

export async function checkSession(): Promise<boolean> {
  const response = await nextApi.get<{ success: boolean }>("/auth/session");
  return response.data.success;
}

// export async function checkSession(): Promise<boolean> {
//   try {
//     const response = await nextApi.get("/auth/session");
//     return response.status === 200;
//   } catch {
//     return false;
//   }
// }

export async function getMe(): Promise<User> {
  const response = await nextApi.get<User>("/users/me");
  return response.data;
}

interface UpdateMeRequest {
  username: string;
}

export async function updateMe(data: UpdateMeRequest): Promise<User> {
  const response = await nextApi.patch<User>("/users/me", data);
  return response.data;
}
