import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Info.css";

const Info = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfo(res.data);
        setEditedInfo(res.data);
      } catch (error) {
        console.error("Failed to fetch personal info", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  const handleChange = (field, value) => {
    setEditedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/user/profile", editedInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(editedInfo);
      setEditing(false);
    } catch (err) {
      console.error("Error saving info", err);
    }
  };

  if (loading) return <p className="info-loading">Loading personal info...</p>;
  if (!info) return <p className="info-loading">No personal info available.</p>;

  return (
    <div className="info-menu-container">
      <div className="info-header">
        <h2>Personal Info</h2>
        <button className="edit-button" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="info-menu">
        {["name", "email", "phone", "address"].map((field) => (
          <div className="info-item-row" key={field}>
            <span className="info-label">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
            {editing ? (
              <input
                type="text"
                className="info-input"
                value={editedInfo[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            ) : (
              <span className="info-value">{info[field]}</span>
            )}
          </div>
        ))}
        <div className="info-item-row">
          <span className="info-label">Joined:</span>
          <span className="info-value">{new Date(info.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {editing && (
        <div className="save-button-wrapper">
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}

      <div className="extras-section">
        <button onClick={() => alert("Help Requested")}>Help & Feedback</button>
        <button onClick={() => (window.location.href = "/login/provider")}>
          Become a Partner
        </button>
        <button onClick={() => alert("Premium Activated")}>Switch to Premium</button>
        <button onClick={() => alert("Security Settings")}>Security Settings</button>
        <button onClick={() => alert("Privacy Center")}>Privacy Controls</button>
      </div>
    </div>
  );
};

export default Info;
