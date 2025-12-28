"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, FileText } from "lucide-react";
import Image from "next/image";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  title: string;
  artist: string;
  albumTitle: string;
  albumCover?: string;
};

export default function Player({ audioRef, title, artist, albumTitle, albumCover }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#1a1a1a",
        borderTop: "1px solid #333",
        padding: "16px 24px",
        display: "flex",
        alignItems: "end",
        gap: "16px",
      }}
    >
      {/* アルバム画像 */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "250px" }}>
        {albumCover ? (
          <Image
            src={albumCover}
            alt={albumTitle}
            width={56}
            height={56}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div style={{ width: "56px", height: "56px", background: "#333" }}></div>
        )}
        <div>
          <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: "bold" }}>{title}</p>
          <p style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{artist}</p>
        </div>
      </div>

      {/* 再生コントロール */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={handlePlayPause}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? (
              <Pause size={20} color='#000' fill='#000' />
            ) : (
              <Play size={20} color='#000' fill='#000' />
            )}
          </button>
        </div>

        {/* プログレスバー */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#9ca3af", fontSize: "0.75rem", minWidth: "40px" }}>
            {formatTime(currentTime)}
          </span>
          <input
            type='range'
            min='0'
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            style={{
              flex: 1,
              cursor: "pointer",
              accentColor: "#00c55e",
            }}
          />
          <span style={{ color: "#9ca3af", fontSize: "0.75rem", minWidth: "40px" }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* ボリュームコントロール */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "150px",
        }}
      >
        <Volume2 size={20} color='#9ca3af' />
        <input
          type='range'
          min='0'
          max='1'
          step='0.01'
          value={volume}
          onChange={handleVolumeChange}
          style={{ flex: 1, cursor: "pointer", accentColor: "#00c55e" }}
        />
      </div>
    </div>
  );
}
