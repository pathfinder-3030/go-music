"use client";

import Menu from "../components/menu";
import SongListItem from "../components/songs/list-item";

export default function Songs() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <Menu />
      {/* コンテンツ */}
      <div style={{ width: "100%", height: "100%", padding: "20px 30px" }}>
        <div style={{ borderBottom: "2.5px solid #d1d5db", paddingBottom: "16px" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>ライブラリ</span>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold", lineHeight: 1.5 }}>ソング</p>
        </div>
        <div>
          {songs.map((song) => (
            <SongListItem
              key={song.id}
              title={song.title}
              artist={song.artist}
              albumTitle={song.albumTitle}
              lyrics={song.lyrics}
            />
          ))}
        </div>
      </div>
      {/* コンテンツ */}
    </div>
  );
}

const songs = [
  {
    id: 1,
    title: "夜に駆ける",
    artist: "YOASOBI",
    albumTitle: "THE BOOK",
    lyrics: "沈むように溶けてゆくように...",
  },
  {
    id: 2,
    title: "群青",
    artist: "YOASOBI",
    albumTitle: "THE BOOK 2",
    lyrics: "さよならだけ 告げて消えた...",
  },
  {
    id: 3,
    title: "怪物",
    artist: "YOASOBI",
    albumTitle: "怪物 / 優しい彗星",
    lyrics: "正しさとは 愚かさとは...",
  },
  {
    id: 4,
    title: "Lemon",
    artist: "米津玄師",
    albumTitle: "Lemon",
    lyrics: "夢ならばどれほどよかったでしょう...",
  },
  {
    id: 5,
    title: "紅蓮華",
    artist: "LiSA",
    albumTitle: "紅蓮華",
    lyrics: "強くなれる理由を知った...",
  },
  {
    id: 6,
    title: "炎",
    artist: "LiSA",
    albumTitle: "炎",
    lyrics: "さよならありがとう 声の限り...",
  },
  {
    id: 7,
    title: "マリーゴールド",
    artist: "あいみょん",
    albumTitle: "青春のエキサイトメント",
    lyrics: "風の強さがちょっと...",
  },
  {
    id: 8,
    title: "Pretender",
    artist: "Official髭男dism",
    albumTitle: "Traveler",
    lyrics: "君とのラブストーリー...",
  },
];
