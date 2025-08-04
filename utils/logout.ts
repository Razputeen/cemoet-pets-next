
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/Login"; // redirect ke halaman login
}
