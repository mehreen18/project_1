import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // ADD THIS

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme(); // ADD THIS

  // colors that change based on theme
  const isDark = theme === "dark";
  const bg        = isDark ? "#0f0f1a" : "#eff6ff";
  const bg2       = isDark ? "#f5f3ff" : "#f5f3ff";
  const card      = isDark ? "#1a1a2e" : "#ffffff";
  const textMain  = isDark ? "#f9fafb" : "#111827";
  const textMuted = isDark ? "#9ca3af" : "#6b7280";
  const textLabel = isDark ? "#d1d5db" : "#374151";
  const inputBg   = isDark ? "#0f0f1a" : "#f9fafb";
  const inputBorder = isDark ? "#2e2e4e" : "#e5e7eb";

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    border: `1.5px solid ${inputBorder}`,
    borderRadius: "10px",
    outline: "none",
    boxSizing: "border-box",
    background: inputBg,
    color: textMain,
    transition: "border 0.2s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const url = isSignUp
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (isSignUp) {
        setIsSignUp(false);
        setForm({ name: "", email: "", password: "" });
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDark
        ? "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)"
        : "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)",
    }}>
      <div style={{
        background: card,
        borderRadius: "20px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.4)"
          : "0 4px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: isDark ? "1px solid #2e2e4e" : "none",
      }}>

        {/* Logo */}
        <div style={{
          width: "52px", height: "52px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontWeight: "700", fontSize: "22px",
          marginBottom: "16px",
        }}>C</div>

        {/* Title */}
        <h2 style={{
          margin: "0 0 6px 0",
          fontSize: "22px",
          fontWeight: "700",
          color: textMain,
        }}>
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p style={{
          margin: "0 0 28px 0",
          fontSize: "14px",
          color: textMuted,
        }}>
          {isSignUp ? "Sign up to get started" : "Login to your ContactBook"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}>

          {isSignUp && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: textLabel }}>
                Full Name
              </label>
              <input
                placeholder="e.g. Ali Khan"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                onBlur={e => e.target.style.borderColor = inputBorder}
              />
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: textLabel }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#4f8ef7"}
              onBlur={e => e.target.style.borderColor = inputBorder}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: textLabel }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#4f8ef7"}
              onBlur={e => e.target.style.borderColor = inputBorder}
            />
          </div>

          {error && (
            <div style={{
              background: isDark ? "#2d1515" : "#fef2f2",
              border: `1px solid ${isDark ? "#7f1d1d" : "#fecaca"}`,
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: isDark ? "#fca5a5" : "#dc2626",
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "6px",
              width: "100%",
              padding: "13px",
              background: loading
                ? "#93c5fd"
                : "linear-gradient(135deg, #4f8ef7, #7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "24px", fontSize: "14px", color: textMuted }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            style={{ color: "#4f8ef7", fontWeight: "600", cursor: "pointer" }}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>

      </div>
    </div>
  );
}


