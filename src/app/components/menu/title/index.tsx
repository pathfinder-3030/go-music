type Props = {
  title: string;
};

export default function MenuTitle({ title }: Props) {
  return (
    <h1 style={{ color: "#fff", padding: "20px 16px", fontSize: "1.25rem", fontWeight: "bold" }}>
      {title}
    </h1>
  );
}
