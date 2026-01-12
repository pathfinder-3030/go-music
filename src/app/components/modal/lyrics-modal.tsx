"use client";

import { X } from "lucide-react";

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
  lyrics?: string;
};

export default function LyricsModal({ isOpen, onClose, title, artist, lyrics }: Props) {
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
          top: -50,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "16px",
            padding: "2px",
            maxWidth: "600px",
            width: "90%",
            maxHeight: "80vh",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "14px",
              padding: "32px",
              maxHeight: "calc(80vh - 4px)",
              overflow: "auto",
              position: "relative",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className='hide-scrollbar'
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
              <X size={24} color='#6b7280' />
            </button>

            <h2 style={{ marginTop: 0, marginBottom: "8px", fontSize: "24px", fontWeight: "bold" }}>
              {title}
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>{artist}</p>

            {lyrics ? (
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>{lyrics}</div>
            ) : (
              <p style={{ color: "#6b7280", fontStyle: "italic" }}>歌詞はありません</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
