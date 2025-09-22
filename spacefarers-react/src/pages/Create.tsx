import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SpacefarerForm, {
  type SpacefarerFormData,
} from "../components/SpacefarerForm";
import { createSpacefarer } from "../api/odata";

export default function Create() {
  const nav = useNavigate();
  const [data, setData] = useState<SpacefarerFormData>({
    name: "",
    email: "",
    role: "Cadet",
    stardustCollection: 0,
    wormholeNavigationSkill: 1,
    totalMerit: 0,
  } as SpacefarerFormData);
  const onChange = (patch: Partial<SpacefarerFormData>) =>
    setData((d) => ({ ...d, ...patch }));

  async function onSave() {
    if (!data.name.trim()) return alert("Name is required");
    const ID = uuid();
    try {
      await createSpacefarer({ ID, ...data });
      nav("/");
    } catch (e: any) {
      alert(e.message || e);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Create Spacefarer</h2>
      <SpacefarerForm
        data={data}
        onChange={onChange}
        onSave={onSave}
        onCancel={() => nav(-1)}
        submitText="Create"
      />
    </div>
  );
}
import { useState } from "react";
