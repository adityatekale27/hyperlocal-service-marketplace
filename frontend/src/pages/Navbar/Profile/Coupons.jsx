import React, { useEffect, useState } from "react";
import axios from "axios";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/user/coupons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCoupons(res.data.coupons);
      } catch (error) {
        console.error("Failed to fetch coupons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <p>Loading coupons...</p>;
  if (coupons.length === 0) return <p>No coupons available.</p>;

  return (
    <div>
      <h3>Your Coupons</h3>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon.code}>
            <strong>{coupon.code}</strong> - {coupon.discount}% off (expires: {new Date(coupon.expiresAt).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coupons;
