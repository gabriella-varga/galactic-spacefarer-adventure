import { type PropsWithChildren } from "react";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/thing-type.js";
import Starfield from "./Starfield";
import "../theme/galaxy.css";
import { UserSwitcher } from "./UserSwitcher.tsx";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Starfield />
      <UserSwitcher />
      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <div className="galaxy-glass" style={{ padding: "16px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
