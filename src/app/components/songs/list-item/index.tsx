"use client";

import { FileText } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LyricsModal from "../../modal/lyrics-modal";
import PrivateSongModal from "../../modal/private-song-modal";
import PasswordInputModal from "../../modal/password-input-modal";
import Label from "../../label";
import { isAuthorized, addAuthorization } from "@/lib/auth";

type Props = {
  id: number;
  title: string;
  artist: string;
  albumTitle: string;
  lyrics?: string;
  albumCover?: string;
  isPublic: boolean;
  password?: string | null;
  checked: boolean;
  onCheckChange: (id: number, checked: boolean) => void;
};

export default function SongListItem({
  id,
  title,
  artist,
  albumTitle,
  lyrics,
  albumCover,
  isPublic,
  password,
  checked,
  onCheckChange,
}: Props) {
  const [isLyricsModalOpen, setIsLyricsModalOpen] = useState(false);
  const [isPrivateModalOpen, setIsPrivateModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const handleLyricsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPublic) {
      // パスワードが設定されている場合
      if (password) {
        // 既に認証済みの場合は歌詞を表示
        if (isAuthorized(id)) {
          setIsLyricsModalOpen(true);
        } else {
          // パスワード入力モーダルを表示
          setPasswordError("");
          setIsPasswordModalOpen(true);
        }
      } else {
        // パスワードが設定されていない場合は非公開モーダルを表示
        setIsPrivateModalOpen(true);
      }
    } else {
      setIsLyricsModalOpen(true);
    }
  };

  const handlePasswordSubmit = (inputPassword: string) => {
    // パスワードチェック
    if (inputPassword === password) {
      // 認証成功
      addAuthorization(id);
      setIsPasswordModalOpen(false);
      setPasswordError("");

      // 歌詞モーダルを表示
      setIsLyricsModalOpen(true);
    } else {
      // 認証失敗
      setPasswordError("パスワードが正しくありません");
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
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
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
            {!isPublic && <Label text='非公開' variant='gray' />}
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

      <PasswordInputModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPasswordError("");
        }}
        onSubmit={handlePasswordSubmit}
        songTitle={title}
        songArtist={artist}
        errorMessage={passwordError}
      />
    </>
  );
}
