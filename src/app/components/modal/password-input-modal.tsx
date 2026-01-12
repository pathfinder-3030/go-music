"use client";

import { Lock, X } from "lucide-react";
import { useState } from "react";

const modalContentStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  songTitle: string;
  songArtist: string;
  errorMessage?: string;
};

export default function PasswordInputModal({
  isOpen,
  onClose,
  onSubmit,
  songTitle,
  songArtist,
  errorMessage
}: Props) {
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setPassword("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  const handleClose = () => {
    onClose();
    setPassword("");
  };

  return (
    <>
      <style>{modalContentStyle}</style>
      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "500px",
            width: "90%",
            position: "relative",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} color="#6b7280" />
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Lock size={48} color="#00c55e" />
          </div>

          <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
            パスワードを入力
          </h2>

          <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "16px", textAlign: "center" }}>
            この楽曲は非公開音源です。
            <br />
            パスワードを入力してください。
          </p>

          <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
            <p style={{ margin: 0, fontWeight: "500", fontSize: "14px", textAlign: "center" }}>{songTitle}</p>
            <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "14px", textAlign: "center" }}>{songArtist}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              autoFocus
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: errorMessage ? "2px solid #ef4444" : "1px solid #d1d5db",
                borderRadius: "6px",
                marginBottom: "8px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            {errorMessage && (
              <p style={{ color: "#ef4444", fontSize: "14px", margin: "0 0 16px 0" }}>
                {errorMessage}
              </p>
            )}
            <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
              <button
                type="button"
                onClick={handleClose}
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  color: "#4b5563",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                キャンセル
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  backgroundColor: "#00c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                確認
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
