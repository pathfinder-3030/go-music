import Menu from "./components/menu";

export default function Home() {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100vh" }}
    >
      <Menu />
      {/* コンテンツ */}
      <div></div>
      {/* コンテンツ */}
    </div>
  );
}
