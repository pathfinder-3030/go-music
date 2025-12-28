"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import Menu from "../components/menu";
import SongListItem from "../components/songs/list-item";
import Player from "../components/player";

export default function Songs() {
  const [checkedSongs, setCheckedSongs] = useState<number[]>([]);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = songs.find((song) => song.id === currentSongId);

  const handleCheckChange = (id: number, checked: boolean) => {
    if (checked) {
      setCheckedSongs([...checkedSongs, id]);
    } else {
      setCheckedSongs(checkedSongs.filter((songId) => songId !== id));
    }
  };

  const handlePlayChecked = () => {
    const firstCheckedSong = songs.find((song) => checkedSongs.includes(song.id));
    if (!firstCheckedSong?.audioSrc) return;

    // 同じ曲で一時停止中の場合は再開
    if (currentSongId === firstCheckedSong.id && audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
      return;
    }

    // 既に再生中の場合は何もしない
    if (currentSongId === firstCheckedSong.id && audioRef.current && !audioRef.current.paused) {
      return;
    }

    // 新しい曲を再生
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const audio = new Audio(firstCheckedSong.audioSrc);
    audioRef.current = audio;
    setCurrentSongId(firstCheckedSong.id);

    audio.play();
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <Menu />
      {/* コンテンツ */}
      <div style={{ width: "100%", height: "100%", padding: "20px 30px" }}>
        <div
          style={{
            borderBottom: "2.5px solid #d1d5db",
            paddingBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
            <div style={{ width: "100%" }}>
              <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>ライブラリ</span>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", lineHeight: 1.5 }}>ソング</p>
                {checkedSongs.length > 0 && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={handlePlayChecked}
                      style={{
                        background: "#00c55e",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 0px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        width: 100,
                      }}
                    >
                      <Play size={16} color='#fff' fill='#fff' />
                      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}>
                        再生
                      </span>
                    </button>
                    <button
                      onClick={handlePause}
                      style={{
                        background: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "8px 0px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        width: 100,
                      }}
                    >
                      <Pause size={16} color='#4b5563' fill='#4b5563' />
                      <span style={{ color: "#4b5563", fontWeight: "bold", fontSize: "1rem" }}>
                        停止
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          {songs.map((song) => (
            <SongListItem
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              albumTitle={song.albumTitle}
              lyrics={song.lyrics}
              checked={checkedSongs.includes(song.id)}
              onCheckChange={handleCheckChange}
            />
          ))}
        </div>
      </div>
      {/* コンテンツ */}

      {/* プレイヤー */}
      {currentSong && (
        <Player
          audioRef={audioRef}
          title={currentSong.title}
          artist={currentSong.artist}
          albumTitle={currentSong.albumTitle}
        />
      )}
    </div>
  );
}

const songs = [
  {
    id: 1,
    title: "俺",
    artist: "HAMAGO",
    albumTitle: "回遊",
    lyrics: "沈むように溶けてゆくように...",
    audioSrc: "/audio/俺.m4a",
  },
  {
    id: 2,
    title: "生きる",
    artist: "HAMAGO",
    albumTitle: "ハンバーガーライム",
    lyrics: "さよならだけ 告げて消えた...",
  },
  {
    id: 3,
    title: "オレ",
    artist: "HAMAGO",
    albumTitle: "回遊",
    lyrics: "正しさとは 愚かさとは...",
  },
  {
    id: 4,
    title: "夜のまま",
    artist: "HAMAGO & AK-69",
    albumTitle: "回遊",
    lyrics: "夢ならばどれほどよかったでしょう...",
  },
  {
    id: 5,
    title: "南風バウンス",
    artist: "HAMAGO",
    albumTitle: "回遊",
    lyrics: "強くなれる理由を知った...",
  },
  {
    id: 6,
    title: "上がる",
    artist: "HAMAGO",
    albumTitle: "ヒップホッパー",
    lyrics: "さよならありがとう 声の限り...",
  },
  {
    id: 7,
    title: "クリぼっち",
    artist: "HAMAGO",
    albumTitle: "タスマニアビーフ",
    lyrics: "風の強さがちょっと...",
  },
];
