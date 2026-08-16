import { cookies } from "next/headers";
import { nextApi } from "./api";
import { User } from "@/types/user";
import { NotesHttpResponse } from "./clientApi";
import { Note } from "@/types/note";

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await nextApi.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
}

export async function fetchNotes(
  page: number,
  userInput: string,
  tag?: string,
): Promise<NotesHttpResponse> {
  const cookieStore = await cookies();
  const response = await nextApi.get<NotesHttpResponse>("/notes", {
    params: {
      search: userInput,
      page,
      perPage: 12,
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  });
  // console.log(response.data)
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  // console.log(response.data);
  return response.data;
}
