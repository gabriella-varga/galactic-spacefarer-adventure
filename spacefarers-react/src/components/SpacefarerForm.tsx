import { Input, Select, Option, Label, Button } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import {
  listPlanets,
  listDepartments,
  listPositions,
  listColors,
} from "../api/odata";

export type SpacefarerFormData = {
  name: string;
  email?: string;
  role: "Admin" | "Viewer" | "Cadet";
  stardustCollection: number;
  wormholeNavigationSkill: number;
  totalMerit: number;
  originPlanet_code?: string;
  department_code?: string;
  position_code?: string;
  spacesuitColor_code?: string;
};

export default function SpacefarerForm(props: {
  data: SpacefarerFormData;
  onChange: (patch: Partial<SpacefarerFormData>) => void;
  onSave: () => void;
  onCancel?: () => void;
  submitText?: string;
}) {
  const { data, onChange, onSave, onCancel, submitText = "Save" } = props;
  const [planets, setPlanets] = useState<any[]>([]);
  const [depts, setDepts] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      listPlanets(),
      listDepartments(),
      listPositions(),
      listColors(),
    ]).then(([p, d, po, c]) => {
      setPlanets(p);
      setDepts(d);
      setPositions(po);
      setColors(c);
    });
  }, []);

  return (
    <div style={{ display: "table-caption", gap: 12, maxWidth: 600 }}>
      <div>
        <Label required>Name</Label>
        <Input
          value={data.name || ""}
          onInput={(e: any) => onChange({ name: e.target.value })}
        />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="Email"
          value={data.email || ""}
          onInput={(e: any) => onChange({ email: e.target.value })}
        />
      </div>

      <div>
        <Label>Role</Label>
        <Select
          value={data.role}
          onChange={(e: any) =>
            onChange({ role: e.detail.selectedOption.textContent })
          }
        >
          <Option>Admin</Option>
          <Option>Viewer</Option>
          <Option>Cadet</Option>
        </Select>
      </div>

      <div>
        <Label>Stardust (0–1000)</Label>
        <Input
          type="Number"
          value={String(data.stardustCollection)}
          onInput={(e: any) =>
            onChange({ stardustCollection: +e.target.value })
          }
        />
      </div>
      <div>
        <Label>Wormhole Nav (1–10)</Label>
        <Input
          type="Number"
          value={String(data.wormholeNavigationSkill)}
          onInput={(e: any) =>
            onChange({ wormholeNavigationSkill: +e.target.value })
          }
        />
      </div>
      <div>
        <Label>Merit Points</Label>
        <Input
          type="Number"
          value={String(data.totalMerit)}
          onInput={(e: any) => onChange({ totalMerit: +e.target.value })}
        />
      </div>

      <div>
        <Label>Origin Planet</Label>
        <Select
          value={data.originPlanet_code || ""}
          onChange={(e: any) =>
            onChange({
              originPlanet_code:
                e.detail.selectedOption.dataset.value || undefined,
            })
          }
        >
          <Option data-value=""></Option>
          {planets.map((p) => (
            <Option key={p.code} data-value={p.code}>
              {p.name}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Department</Label>
        <Select
          value={data.department_code || ""}
          onChange={(e: any) =>
            onChange({
              department_code:
                e.detail.selectedOption.dataset.value || undefined,
            })
          }
        >
          <Option data-value=""></Option>
          {depts.map((d) => (
            <Option key={d.code} data-value={d.code}>
              {d.name}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Position</Label>
        <Select
          value={data.position_code || ""}
          onChange={(e: any) =>
            onChange({
              position_code: e.detail.selectedOption.dataset.value || undefined,
            })
          }
        >
          <Option data-value=""></Option>
          {positions.map((p) => (
            <Option key={p.code} data-value={p.code}>
              {p.name}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <Label>Suit Color</Label>
        <Select
          value={data.spacesuitColor_code || ""}
          onChange={(e: any) =>
            onChange({
              spacesuitColor_code:
                e.detail.selectedOption.dataset.value || undefined,
            })
          }
        >
          <Option data-value=""></Option>
          {colors.map((c) => (
            <Option key={c.code} data-value={c.code}>
              {c.name}
            </Option>
          ))}
        </Select>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <Button design="Emphasized" onClick={onSave}>
          {submitText}
        </Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </div>
    </div>
  );
}
