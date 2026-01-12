"use client";

import { Lock, X } from "lucide-react";

const modalContentStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist: string;
};

export default function PrivateSongModal({ isOpen, onClose, title, artist }: Props) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
            textAlign: "center",
          }}
        >
          <button
            onClick={onClose}
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
            <Lock size={48} color="#ef4444" />
          </div>

          <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "24px", fontWeight: "bold" }}>
            非公開音源
          </h2>

          <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "16px" }}>
            こちらの楽曲は非公開音源です。
          </p>

          <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
            <p style={{ margin: 0, fontWeight: "500", fontSize: "14px" }}>{title}</p>
            <p style={{ margin: "4px 0 0 0", color: "#6b7280", fontSize: "14px" }}>{artist}</p>
          </div>

          <button
            onClick={onClose}
            style={{
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
            閉じる
          </button>
        </div>
      </div>
    </>
  );
}
