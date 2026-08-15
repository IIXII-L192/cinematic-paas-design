import { Moon, Sun } from "lucide-react";
import { StrataLogo } from "./StrataLogo";

interface Props {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: Props) {
  return (
    <header
      className="flex items-center justify-between px-6 py-4"
      style={{
        background: "var(--strata-bg)",
        borderColor: "var(--hairline)",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
    >
      <StrataLogo />
      <div
        role="group"
        aria-label="Theme"
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: 4,
          gap: 4,
          borderRadius: 4,
          background: "var(--chrome-bg)",
        }}
      >
        <button
          aria-label="Light theme"
          aria-pressed={theme === "light"}
          onClick={() => theme !== "light" && onToggleTheme()}
          style={{
            width: 26,
            height: 26,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme === "light" ? "var(--chip-active-bg)" : "transparent",
            color: theme === "light" ? "var(--chip-active-color)" : "var(--chip-color)",
            transition: "background 160ms, color 160ms",
          }}
        >
          <Sun size={13} />
        </button>
        <button
          aria-label="Dark theme"
          aria-pressed={theme === "dark"}
          onClick={() => theme !== "dark" && onToggleTheme()}
          style={{
            width: 26,
            height: 26,
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme === "dark" ? "var(--chip-active-bg)" : "transparent",
            color: theme === "dark" ? "var(--chip-active-color)" : "var(--chip-color)",
            transition: "background 160ms, color 160ms",
          }}
        >
          <Moon size={13} />
        </button>
      </div>
    </header>
  );
}
