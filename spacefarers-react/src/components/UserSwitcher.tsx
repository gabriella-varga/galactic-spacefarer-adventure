import { useEffect, useState } from "react";
import { currentAuth, setMockUser, clearMockUser } from "../auth";

const PRESET = [
  { id: "adminuser", pass: "abcd1234", label: "Nova (Admin, PX)" },
  { id: "cassian", pass: "cass", label: "Cassian (Viewer, PY)" },
  { id: "recruiter", pass: "recruit", label: "Recruiter" },
];

export function UserSwitcher() {
  const [, setWho] = useState<{
    id?: string;
    roles?: string[];
    planet?: string | null;
  }>({});

  useEffect(() => {
    fetch("/whoami", {
      headers: {
        ...(currentAuth().user
          ? {
              Authorization:
                "Basic " + btoa(`${currentAuth().user}:${currentAuth().pass}`),
            }
          : {}),
      },
    })
      .then((r) => (r.ok ? r.json() : { id: null }))
      .then(setWho)
      .catch(() => setWho({}));
  }, []);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select
        value={currentAuth().user || ""}
        onChange={(e) => {
          const u = PRESET.find((x) => x.id === e.target.value);
          if (u) setMockUser(u.id, u.pass);
        }}
      >
        <option value="">— choose user —</option>
        {PRESET.map((u) => (
          <option key={u.id} value={u.id}>
            {u.label}
          </option>
        ))}
      </select>

      <span style={{ opacity: 0.8 }}>
        {currentAuth().user
          ? `Logged in: ${currentAuth().user}`
          : "Not authenticated"}
        <button onClick={() => clearMockUser()}>Logout</button>
      </span>
    </div>
  );
}
