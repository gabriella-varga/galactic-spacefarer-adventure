import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeaderRow,
  TableHeaderCell,
  TableRow,
  TableCell,
  Toolbar,
  ToolbarSpacer,
  Input,
  Button,
} from "@ui5/webcomponents-react";
import { listSpacefarers } from "../api/odata";

export default function List() {
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const nav = useNavigate();

  useEffect(() => {
    listSpacefarers({ q, page, pageSize }).then((d) => {
      setRows(d.value);
      setCount(d["@odata.count"] ?? 0);
    });
  }, [q, page]);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <h3 style={{ margin: 0 }}>Spacefarers</h3>
        <br />
        <h4 style={{ margin: 0 }}>Pagination set to: {pageSize}</h4>
        <div className="badge">{count || 0} total</div>
      </div>

      <div className="table-wrap ">
        <Toolbar>
          <Input
            placeholder="Filter by name…"
            onInput={(e: any) => setQ(e.target.value)}
          />
          <ToolbarSpacer />
          <Button design="Emphasized" onClick={() => nav("/create")}>
            New Spacefarer
          </Button>
        </Toolbar>

        <Table>
          <TableHeaderRow slot="header">
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Stardust</TableHeaderCell>
            <TableHeaderCell>Origin</TableHeaderCell>
            <TableHeaderCell>Suit</TableHeaderCell>
          </TableHeaderRow>

          {rows.map((r) => (
            <TableRow
              key={r.ID}
              onClick={() => nav(`/edit/${r.ID}`)}
              style={{ cursor: "pointer" }}
            >
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.email ?? ""}</TableCell>
              <TableCell>{r.role ?? ""}</TableCell>
              <TableCell>{r.stardustCollection ?? 0}</TableCell>
              <TableCell>{r.originPlanet?.name ?? ""}</TableCell>
              <TableCell>{r.spacesuitColor?.name ?? ""}</TableCell>
            </TableRow>
          ))}
        </Table>
        <Toolbar>
          <Button
            className={"gx-btn"}
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <ToolbarSpacer />
          <span style={{ padding: "0 .5rem" }}>
            {count
              ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, count)} / ${count}`
              : "0 / 0"}
          </span>
          <ToolbarSpacer />
          <Button
            className={"gx-btn"}
            disabled={(page + 1) * pageSize >= count}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </Toolbar>
      </div>
    </>
  );
}
