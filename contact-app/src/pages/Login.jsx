import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setIsSignUp(false); // switch to login mode after signup
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        )}
        <input type="email" placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">{isSignUp ? "Create Account" : "Login"}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer" }}>
        {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
      </p>
    </div>
  );
}