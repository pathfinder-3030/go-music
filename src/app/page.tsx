"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import Menu from "./components/menu";

export default function Home() {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <Menu />
      {/* コンテンツ */}
      <div
        style={{ width: "100%", height: "100%", border: "1px solid blue", padding: "20px 30px" }}
      >
        <div style={{ borderBottom: "2.5px solid #d1d5db", paddingBottom: "16px" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>ライブラリ</span>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", lineHeight: 1.5 }}>ソング</p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "16px",
              justifyContent: "space-between",
              border: "1px solid red",
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
              <p>作成者</p>
            </div>
            <div>
              <p>アルバムタイトル</p>
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
        </div>
      </div>
      {/* コンテンツ */}
    </div>
  );
}
