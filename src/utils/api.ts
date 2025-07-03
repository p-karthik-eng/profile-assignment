const baseUrl = import.meta.env.VITE_API_URL;
import type { Profile } from "../store/profileSlice";

export async function loginUser(username: string, data: Profile) {
  const res = await fetch(
    `${baseUrl}?username=${encodeURIComponent(username)}`
  );

  const users = await res.json();

  if (users.length > 0) {
    const user = users[0];
    const updateRes = await fetch(`${baseUrl}/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, ...data }),
    });

    return await updateRes.json();
  } else {
    const createRes = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, ...data }),
    });
    return await createRes.json();
  }
}
