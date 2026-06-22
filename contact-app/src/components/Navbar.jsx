import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        height: "64px",
        background: theme === "light" ? "#ffffff" : "#1a1a2e",
        borderBottom: theme === "light" ? "1px solid #e5e7eb" : "1px solid #2e2e4e",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>

        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "700", fontSize: "16px",
          }}>C</div>
          <span style={{
            fontWeight: "700", fontSize: "17px",
            color: theme === "light" ? "#111827" : "#f9fafb",
            letterSpacing: "-0.3px",
          }}>ContactBook</span>
        </div>

       
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {[
            { label: "Dashboard", path: "/" },
            { label: "Login",     path: "/login" },
          ].map(({ label, path }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} style={{
                textDecoration: "none",
                padding: "7px 18px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: active ? "600" : "500",
                color: active
                  ? "#4f8ef7"
                  : theme === "light" ? "#4b5563" : "#9ca3af",
                background: active
                  ? theme === "light" ? "#eff6ff" : "#1e3a5f"
                  : "transparent",
                transition: "all 0.15s ease",
              }}>{label}</Link>
            );
          })}
        </div>

        
        <button onClick={toggleTheme} style={{
          display: "flex", alignItems: "center", gap: "7px",
          padding: "8px 16px", borderRadius: "8px", border: "none",
          cursor: "pointer", fontSize: "13px", fontWeight: "500",
          background: theme === "light" ? "#f3f4f6" : "#2d2d44",
          color: theme === "light" ? "#374151" : "#d1d5db",
          transition: "all 0.2s ease",
        }}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

      </nav>
    </>
  );
}