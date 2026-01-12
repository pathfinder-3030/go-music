"use client";

type LabelProps = {
  text: string;
  variant?: "default" | "gray" | "red" | "green" | "blue";
};

const variantStyles = {
  default: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    border: "1px solid #d1d5db",
  },
  gray: {
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    border: "1px solid #d1d5db",
  },
  red: {
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    border: "1px solid #fecaca",
  },
  green: {
    backgroundColor: "#f0fdf4",
    color: "#22c55e",
    border: "1px solid #bbf7d0",
  },
  blue: {
    backgroundColor: "#eff6ff",
    color: "#3b82f6",
    border: "1px solid #bfdbfe",
  },
};

export default function Label({ text, variant = "default" }: LabelProps) {
  const style = variantStyles[variant];

  return (
    <span
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontSize: "12px",
        fontWeight: "500",
        padding: "2px 8px",
        borderRadius: "4px",
        border: style.border,
        display: "inline-block",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}
