import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpacefarerForm, {
  type SpacefarerFormData,
} from "../components/SpacefarerForm";
import {
  getSpacefarer,
  updateSpacefarer,
  deleteSpacefarer,
} from "../api/odata";

export function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState<SpacefarerFormData | null>(null);

  useEffect(() => {
    if (!id) return;
    getSpacefarer(id).then((sf) => {
      const d: SpacefarerFormData = {
        name: sf.name,
        email: sf.email || undefined,
        role: (sf.role as any) || "Cadet",
        stardustCollection: sf.stardustCollection ?? 0,
        wormholeNavigationSkill: sf.wormholeNavigationSkill ?? 1,
        totalMerit: sf.totalMerit ?? 0,
        originPlanet_code: sf.originPlanet_code || undefined,
        department_code: sf.department_code || undefined,
        position_code: sf.position_code || undefined,
        spacesuitColor_code: sf.spacesuitColor_code || undefined,
      };
      setData(d);
    });
  }, [id]);

  const onChange = (patch: Partial<SpacefarerFormData>) =>
    setData((d) => (d ? { ...d, ...patch } : d));

  async function onSave() {
    if (!id || !data) return;
    try {
      await updateSpacefarer(id, data);
      nav("/");
    } catch (e: any) {
      alert(e.message || e);
    }
  }

  async function onDelete() {
    if (!id) return;
    if (!confirm("Delete this spacefarer?")) return;
    try {
      await deleteSpacefarer(id);
      nav("/");
    } catch (e: any) {
      alert(e.message || e);
    }
  }

  if (!data) return <div style={{ padding: 16 }}>Loading…</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Edit Spacefarer</h2>
      <SpacefarerForm
        data={data}
        onChange={onChange}
        onSave={onSave}
        onCancel={() => nav(-1)}
        submitText="Save"
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
