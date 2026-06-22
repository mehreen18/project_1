import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [success, setSuccess] = useState("");
  const { theme } = useTheme();

  const isDark = theme === "dark";

  
  const pageBg    = isDark ? "#0f0f1a" : "#f5f7ff";
  const cardBg    = isDark ? "#1a1a2e" : "#ffffff";
  const textMain  = isDark ? "#f9fafb" : "#111827";
  const textMuted = isDark ? "#9ca3af" : "#6b7280";
  const textLabel = isDark ? "#d1d5db" : "#374151";
  const inputBg   = isDark ? "#0f0f1a" : "#f9fafb";
  const inputBorder = isDark ? "#2e2e4e" : "#e5e7eb";
  const divider   = isDark ? "#2e2e4e" : "#f0f0f0";

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    setContacts(await res.json());
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", phone: "", email: "" });
    setSuccess("Contact added successfully!");
    setTimeout(() => setSuccess(""), 3000);
    fetchContacts();
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    fontSize: "14px",
    border: `1.5px solid ${inputBorder}`,
    borderRadius: "10px",
    outline: "none",
    background: inputBg,
    color: textMain,
    boxSizing: "border-box",
    transition: "border 0.2s",
  };

  
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };


  const avatarColors = [
    { bg: "#dbeafe", text: "#1d4ed8" },
    { bg: "#ede9fe", text: "#6d28d9" },
    { bg: "#fce7f3", text: "#be185d" },
    { bg: "#d1fae5", text: "#065f46" },
    { bg: "#ffedd5", text: "#c2410c" },
    { bg: "#e0f2fe", text: "#0369a1" },
  ];
  const getAvatarColor = (name) => {
    const index = (name?.charCodeAt(0) || 0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: pageBg,
      padding: "32px 24px",
      transition: "background 0.3s",
    }}>
      <div style={{
        maxWidth: "860px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}>

       
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: textMain }}>
            Contact Dashboard
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: textMuted }}>
            Manage and add your contacts below
          </p>
        </div>

       
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}>
          {[
            { label: "Total Contacts", value: contacts.length },
            { label: "With Phone",     value: contacts.filter(c => c.phone).length },
            { label: "With Email",     value: contacts.filter(c => c.email).length },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: cardBg,
              borderRadius: "14px",
              padding: "20px",
              border: `1px solid ${inputBorder}`,
              textAlign: "center",
            }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#4f8ef7" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "13px", color: textMuted, marginTop: "4px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        
        <div style={{
          background: cardBg,
          borderRadius: "16px",
          padding: "28px",
          border: `1px solid ${inputBorder}`,
        }}>
          <h2 style={{ margin: "0 0 20px", fontSize: "17px", fontWeight: "700", color: textMain }}>
            Add New Contact
          </h2>

          <form onSubmit={handleAdd}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "14px",
              marginBottom: "16px",
            }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: textLabel }}>
                  Full Name *
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

              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: textLabel }}>
                  Phone Number
                </label>
                <input
                  placeholder="e.g. 0300-1234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                  onBlur={e => e.target.style.borderColor = inputBorder}
                />
              </div>

              
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: textLabel }}>
                  Email Address
                </label>
                <input
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                  onBlur={e => e.target.style.borderColor = inputBorder}
                />
              </div>
            </div>

            
            {success && (
              <div style={{
                background: isDark ? "#052e16" : "#f0fdf4",
                border: `1px solid ${isDark ? "#166534" : "#bbf7d0"}`,
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "13px",
                color: isDark ? "#86efac" : "#16a34a",
                marginBottom: "14px",
              }}>
                {success}
              </div>
            )}

            <button type="submit" style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}>
              + Add Contact
            </button>
          </form>
        </div>

        
        <div style={{
          background: cardBg,
          borderRadius: "16px",
          border: `1px solid ${inputBorder}`,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "20px 28px",
            borderBottom: `1px solid ${divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: textMain }}>
              All Contacts
            </h2>
            <span style={{
              background: isDark ? "#1e3a5f" : "#eff6ff",
              color: "#4f8ef7",
              fontSize: "12px",
              fontWeight: "600",
              padding: "4px 12px",
              borderRadius: "20px",
            }}>
              {contacts.length} total
            </span>
          </div>

          {contacts.length === 0 ? (
            <div style={{
              padding: "48px",
              textAlign: "center",
              color: textMuted,
              fontSize: "14px",
            }}>
              No contacts yet. Add one above!
            </div>
          ) : (
            contacts.map((c, index) => {
              const avatar = getAvatarColor(c.name);
              const initials = getInitials(c.name);
              return (
                <div key={c.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 28px",
                  borderBottom: index < contacts.length - 1
                    ? `1px solid ${divider}` : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = isDark ? "#1e1e3a" : "#f9fafb"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  
                  <div style={{
                    width: "42px", height: "42px",
                    borderRadius: "50%",
                    background: isDark ? "#1e3a5f" : avatar.bg,
                    color: isDark ? "#93c5fd" : avatar.text,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "700", fontSize: "14px",
                    flexShrink: 0,
                  }}>
                    {initials}
                  </div>

                  
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: "600", fontSize: "14px", color: textMain,
                    }}>
                      {c.name}
                    </div>
                    <div style={{
                      fontSize: "13px", color: textMuted, marginTop: "2px",
                      display: "flex", gap: "16px", flexWrap: "wrap",
                    }}>
                      {c.phone && <span>📞 {c.phone}</span>}
                      {c.email && <span>✉️ {c.email}</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}