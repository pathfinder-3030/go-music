"use client";

import { FileText, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LyricsModal from "../../modal/lyrics-modal";
import PrivateSongModal from "../../modal/private-song-modal";

type Props = {
  id: number;
  title: string;
  artist: string;
  albumTitle: string;
  lyrics?: string;
  albumCover?: string;
  isPublic: boolean;
  checked: boolean;
  onCheckChange: (id: number, checked: boolean) => void;
};

export default function SongListItem({ id, title, artist, albumTitle, lyrics, albumCover, isPublic, checked, onCheckChange }: Props) {
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);

  const handleLyricsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPublic) {
      setIsPrivateModalOpen(true);
    } else {
      setIsLyricsModalOpen(true);
    }
  };

  const handleCloseLyricsModal = () => {
    setIsLyricsModalOpen(false);
  };

  const handleClosePrivateModal = () => {
    setIsPrivateModalOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(id, e.target.checked);
  };

  return (
    <>
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
          <div style={{ width: "200px", display: "flex", alignItems: "center", gap: "8px" }}>
            <p style={{ margin: 0 }}>{title}</p>
            {!isPublic && (
              <Lock size={16} color="#ef4444" title="非公開音源" />
            )}
          </div>
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

      <LyricsModal
        isOpen={isLyricsModalOpen}
        onClose={handleCloseLyricsModal}
        title={title}
        artist={artist}
        lyrics={lyrics}
      />

      <PrivateSongModal
        isOpen={isPrivateModalOpen}
        onClose={handleClosePrivateModal}
        title={title}
        artist={artist}
      />
    </>
  );
}
