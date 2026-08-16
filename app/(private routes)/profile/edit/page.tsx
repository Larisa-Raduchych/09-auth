"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfile.module.css";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";

export default function EditProfilePage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [user, setLocalUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    getMe().then((data) => {
      setLocalUser(data);
      setUsername(data.username);
    });
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const newUsername = formData.get("username") as string;
    const updatedUser = await updateMe({ username: newUsername });
    setUser(updatedUser);
    router.push("/profile");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
