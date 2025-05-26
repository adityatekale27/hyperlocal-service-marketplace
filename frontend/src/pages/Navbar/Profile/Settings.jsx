import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("/api/user/update", { email, phone }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to update settings", err);
      setMsg("Update failed.");
    }
  };

  return (
    <div>
      <h3>Update Settings</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="email"
          placeholder="Update Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="tel"
          placeholder="Update Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /><br />
        <button type="submit">Update</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Settings;
