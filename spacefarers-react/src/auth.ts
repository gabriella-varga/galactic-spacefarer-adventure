type Creds = { user?: string; pass?: string };
let auth: Creds = JSON.parse(localStorage.getItem("mockAuth") || "{}");

export function currentAuth() {
  return auth;
}

export function setMockUser(user: string, pass: string) {
  auth = { user, pass };
  localStorage.setItem("mockAuth", JSON.stringify(auth));
  location.reload();
}

export function clearMockUser() {
  auth = {};
  localStorage.removeItem("mockAuth");
  location.reload();
}

export function authHeader() {
  if (!auth.user || !auth.pass) return {};
  return { Authorization: "Basic " + btoa(`${auth.user}:${auth.pass}`) };
}
