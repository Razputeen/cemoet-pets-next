
export async function getUserProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}
