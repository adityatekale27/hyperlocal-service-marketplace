import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Info from "./Profile/Info";
import Orders from './Profile/Orders'
import Settings from './Profile/Settings'
import Coupons from "./Profile/Coupons"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("personalInfo");



  const Notifications = () => <div className="placeholder">📩 Notifications Page</div>;
  const Payments = () => <div className="placeholder">💳 Payment Methods</div>;
  const Referral = () => <div className="placeholder">🎁 Refer & Earn</div>;
  const Contact = () => <div className="placeholder">📞 Contact Us</div>;


  //For integrating with backend

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const token = localStorage.getItem("token"); // or cookie
  //       const res = await axios.get("https://backend.com/api/user/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(res.data);
  //     } catch (err) {
  //       console.error("Error fetching profile", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  useEffect(() => {
    // Simulate fetching user profile
    const fetchProfile = async () => {
      try {
        // If backend/token available, do fetch here.
        // For now, use dummy user data:

        const dummyUser = {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "+1 234 567 890",                ////dummy user...delete after adding backend
          address: "1234 Elm Street, Springfield",
          createdAt: "2023-01-15T10:00:00Z",
        };

        // Simulate network delay
        await new Promise((res) => setTimeout(res, 500));

        setUser(dummyUser);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="profile-container">Loading...</div>;

  if (!user) return <div className="profile-container">User not found or not logged in.</div>;


  const renderContent = () => {
    switch (selectedTab) {
      case "personalInfo": return <Info />;
      case "orders": return <Orders />;
      case "coupons": return <Coupons />;
      case "settings": return <Settings />;
      case "notifications": return <Notifications />;
      case "payments": return <Payments />;
      case "referral": return <Referral />;
      case "contact": return <Contact />;
      default: return <Info />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login/customer";
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-top">
          <h2 className="sidebar-title">My Dashboard</h2>
          <ul className="sidebar-menu">
            <li className={selectedTab === "personalInfo" ? "active" : ""} onClick={() => setSelectedTab("personalInfo")}>Personal Info</li>
            <li className={selectedTab === "orders" ? "active" : ""} onClick={() => setSelectedTab("orders")}>Orders</li>
            <li className={selectedTab === "coupons" ? "active" : ""} onClick={() => setSelectedTab("coupons")}>Coupons</li>
            <li className={selectedTab === "settings" ? "active" : ""} onClick={() => setSelectedTab("settings")}>Settings</li>
            <li className={selectedTab === "notifications" ? "active" : ""} onClick={() => setSelectedTab("notifications")}>Notifications</li>
            <li className={selectedTab === "payments" ? "active" : ""} onClick={() => setSelectedTab("payments")}>Payment Methods</li>
            <li className={selectedTab === "referral" ? "active" : ""} onClick={() => setSelectedTab("referral")}>Refer & Earn</li>
            <li className={selectedTab === "contact" ? "active" : ""} onClick={() => setSelectedTab("contact")}>Contact Us</li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <div className="logout-button" onClick={handleLogout}>Logout</div>
        </div>
      </aside>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Profile;