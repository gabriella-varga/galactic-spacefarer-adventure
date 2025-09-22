import { authHeader } from "../auth";

export async function api(path: string, init: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(init.headers || {}),
    ...authHeader(),
  };
  // @ts-ignore
  const res = await fetch(path, { ...init, headers, credentials: "omit" });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = await res.json();
      msg = j?.error?.message || msg;
    } catch {}
    throw new Error(`${res.status}: ${msg}`);
  }
  return res;
}
