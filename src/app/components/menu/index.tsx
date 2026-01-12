import { Music, Sparkles } from "lucide-react";
import MenuItem from "./menu-item";
import MenuTitle from "./title";

export default function Menu() {
  return (
    <div style={{ height: "100%", minWidth: "200px", background: "#0f0f0f" }}>
      <MenuTitle title='GO MUSIC' />
      <div style={{ padding: "0px 16px ", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>ライブラリ</p>
        <MenuItem href='/songs' icon={Music} label='ソング' />
      </div>
    </div>
  );
}
