"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

export default function SongListItem() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
        <div style={{ width: "40px", height: "40px", background: "gray" }}></div>
        <p>タイトル</p>
      </div>
      <div>
        <p style={{ color: "#6b7280" }}>作成者</p>
      </div>
      <div>
        <p style={{ color: "#6b7280" }}>アルバムタイトル</p>
      </div>
      <button
        onClick={() => console.log("歌詞ボタンクリック")}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileText size={20} color='#6b7280' />
      </button>
    </div>
  );
}
