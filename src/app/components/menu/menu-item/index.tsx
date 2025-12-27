import Link from "next/link";
import { LucideIcon } from "lucide-react";

type Props = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export default function MenuItem({ href, icon: Icon, label }: Props) {
  return (
    <Link
      href={href}
      style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
    >
      <Icon size={20} color='#fff' />
      <p style={{ color: "#fff", fontSize: "1rem" }}>{label}</p>
    </Link>
  );
}
