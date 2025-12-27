"use client";

import Menu from "../components/menu";
import SongListItem from "../components/songs/list-item";

export default function Songs() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <Menu />
      {/* コンテンツ */}
      <div style={{ width: "100%", height: "100%", padding: "20px 30px" }}>
        <div style={{ borderBottom: "2.5px solid #d1d5db", paddingBottom: "16px" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>ライブラリ</span>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", lineHeight: 1.5 }}>ソング</p>
        </div>
        <div>
          <SongListItem />
          <SongListItem />
          <SongListItem />
          <SongListItem />
          <SongListItem />
          <SongListItem />
          <SongListItem />
          <SongListItem />
        </div>
      </div>
      {/* コンテンツ */}
    </div>
  );
}
