const BASE = "http://localhost:4004/odata/v4/galaxy";
const key = (id: string) => `(ID=${id},IsActiveEntity=true)`;
import { api } from "./http";

export type Spacefarer = {
  ID: string;
  name: string;
  email?: string | null;
  role?: "Admin" | "Viewer" | "Cadet";
  stardustCollection?: number;
  wormholeNavigationSkill?: number;
  totalMerit?: number;
  originPlanet_code?: string | null;
  department_code?: string | null;
  position_code?: string | null;
  spacesuitColor_code?: string | null;
  isActiveEntity?: boolean;
};

function qs(params: Record<string, string | number | boolean | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(
    ([k, v]) => v !== undefined && sp.set(k, String(v)),
  );
  return sp.toString();
}

export async function listSpacefarers(
  opts: {
    q?: string;
    page?: number;
    pageSize?: number;
    orderby?: string;
  } = {},
) {
  const { q, page = 0, pageSize = 20, orderby = "name" } = opts;
  const params: any = {
    $select:
      "ID,name,email,role,stardustCollection,wormholeNavigationSkill,totalMerit,originPlanet_code,spacesuitColor_code",
    $expand: "originPlanet($select=name),spacesuitColor($select=name)",
    $orderby: orderby,
    $top: pageSize,
    $skip: page * pageSize,
    $count: true,
  };
  if (q) params.$filter = `contains(name,'${q.replace(/'/g, "''")}')`;
  const res = await api(`${BASE}/Spacefarers?${qs(params)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getSpacefarer(id: string) {
  const res = await api(
    `${BASE}/Spacefarers${key(id)}?` +
      `$expand=originPlanet($select=name),spacesuitColor($select=name)`,
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createSpacefarer(sf: Partial<Spacefarer>) {
  console.log("createSpacefarer", sf);

  const payload = { ...sf, IsActiveEntity: true };

  const res = await api(`${BASE}/Spacefarers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateSpacefarer(id: string, patch: any) {
  const res = await api(`${BASE}/Spacefarers${key(id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function deleteSpacefarer(id: string) {
  const res = await api(`${BASE}/Spacefarers${key(id)}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}

export async function listPlanets() {
  const r = await api(`${BASE}/Planets?$select=code,name&$orderby=name`);
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).value as { code: string; name: string }[];
}
export async function listDepartments() {
  const r = await api(`${BASE}/Departments?$select=code,name&$orderby=name`);
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).value as { code: string; name: string }[];
}
export async function listPositions() {
  const r = await api(`${BASE}/Positions?$select=code,name&$orderby=name`);
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).value as { code: string; name: string }[];
}
export async function listColors() {
  const r = await api(`${BASE}/SuitColors?$select=code,name&$orderby=name`);
  if (!r.ok) throw new Error(await r.text());
  return (await r.json()).value as { code: string; name: string }[];
}
