"use client";

import { FileText } from "lucide-react";
import Image from "next/image";

type Props = {
  id: number;
  title: string;
  artist: string;
  albumTitle: string;
  lyrics?: string;
  albumCover?: string;
  audioSrc?: string;
  checked: boolean;
  onCheckChange: (id: number, checked: boolean) => void;
};

export default function SongListItem({ id, title, artist, albumTitle, lyrics, albumCover, audioSrc, checked, onCheckChange }: Props) {
  const handleLyricsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lyrics) {
      console.log("歌詞:", lyrics);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(id, e.target.checked);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
        <input
          type='checkbox'
          checked={checked}
          onChange={handleCheckboxChange}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
        {albumCover ? (
          <Image
            src={albumCover}
            alt={albumTitle}
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "40px", height: "40px", background: "gray" }}></div>
        )}
        <p style={{ width: "200px" }}>{title}</p>
      </div>
      <div style={{ width: "200px" }}>
        <p style={{ color: "#6b7280" }}>{artist}</p>
      </div>
      <div style={{ width: "200px" }}>
        <p style={{ color: "#6b7280" }}>{albumTitle}</p>
      </div>
      <button
        onClick={handleLyricsClick}
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
