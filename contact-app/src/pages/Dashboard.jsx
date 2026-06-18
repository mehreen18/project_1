import { useEffect, useState } from "react";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

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
    fetchContacts();
  };

  return (
    <div className="dashboard">
      <h2>Add Contact</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <h2>Contacts</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>{c.name} — {c.phone} — {c.email}</li>
        ))}
      </ul>
    </div>
  );
}