import React, { useState, useEffect, useRef } from "react";
import './ProviderLogin.css';

const GOOGLE_MAPS_API_KEY = "AIzaSyB3Yaav6N_IKsa676sQDR4HcDwij2j9hTI"; // Replace with your actual API key

const loadGoogleMapsScript = (callback) => {
  if (window.google) {
    callback();
    return;
  }
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
};
const availableServices = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Gardener",
  "Mechanic",
  "Welder",
  "AC Repair",
  "Pest Control"
];

const ProviderLogin = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Login inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration inputs
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regServices, setRegServices] = useState([]); // array of selected services
  const [serviceInput, setServiceInput] = useState(""); // text input for filtering
  const [showDropdown, setShowDropdown] = useState(false);
  const [regExperience, setRegExperience] = useState(0);
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // For Google Maps location picker
  const [serviceAreas, setServiceAreas] = useState([]); // Array of { label, location: { type: 'Point', coordinates: [lng, lat] }, radiusMeters }

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // { lat, lng }
  const [radiusMeters, setRadiusMeters] = useState(5000);
  const [areaLabel, setAreaLabel] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize Google Map
  useEffect(() => {
    if (!isLogin) {
      loadGoogleMapsScript(() => {
        setMapLoaded(true);
      });
    }
  }, [isLogin]);

  useEffect(() => {
    if (mapLoaded && !mapRef.current) {
      const defaultPos = { lat: 28.6139, lng: 77.209 }; // Default to Delhi (example)

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: defaultPos,
        zoom: 12,
      });
      mapRef.current = map;

      const marker = new window.google.maps.Marker({
        position: defaultPos,
        map,
        draggable: true,
      });
      markerRef.current = marker;

      const circle = new window.google.maps.Circle({
        map,
        radius: radiusMeters,
        fillColor: "#AA0000",
        strokeColor: "#AA0000",
        strokeOpacity: 0.5,
        fillOpacity: 0.2,
        center: defaultPos,
        draggable: false,
        editable: true,
      });
      circleRef.current = circle;

      // Update selected location and radius on marker drag
      marker.addListener("dragend", () => {
        const pos = marker.getPosition();
        setSelectedLocation({ lat: pos.lat(), lng: pos.lng() });
        circle.setCenter(pos);
      });

      // Update radiusMeters when circle radius is changed (editable circle)
      circle.addListener("radius_changed", () => {
        const newRadius = circle.getRadius();
        setRadiusMeters(Math.round(newRadius));
      });

      // Initial selected location
      setSelectedLocation(defaultPos);
    }
  }, [mapLoaded]);

  // Update circle radius when radiusMeters changes
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radiusMeters);
    }
  }, [radiusMeters]);

  // Handle adding a service area to list
  const addServiceArea = () => {
    if (!areaLabel) {
      alert("Please enter a label for the service area.");
      return;
    }
    if (!selectedLocation) {
      alert("Please select a location on the map.");
      return;
    }

    const newArea = {
      label: areaLabel,
      location: {
        type: "Point",
        coordinates: [selectedLocation.lng, selectedLocation.lat],
      },
      radiusMeters: radiusMeters,
    };

    setServiceAreas((prev) => [...prev, newArea]);
    setAreaLabel("");
  };

  // Remove a service area from the list
  const removeServiceArea = (index) => {
    setServiceAreas((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/provider/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("providerToken", data.token);
      window.location.href = "/provider/home";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Handle register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (regPassword !== regConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (serviceAreas.length === 0) {
      setError("Please add at least one service area.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/provider/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: regName,
          email: regEmail,
          phone: regPhone,
          services: regServices.split(",").map(s => s.trim()), // split by comma into array
          experience: Number(regExperience),
          serviceAreas: serviceAreas,
          password: regPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("providerToken", data.token);
      window.location.href = "/provider/home";
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="provider-container">
      <div className="toggle-section">
        <button
          className={isLogin ? "active-toggle" : ""}
          onClick={() => {
            setIsLogin(true);
            setError("");
          }}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active-toggle" : ""}
          onClick={() => {
            setIsLogin(false);
            setError("");
          }}
        >
          Register
        </button>
      </div>

      {isLogin ? (
        <form className="form-box" onSubmit={handleLoginSubmit}>
          <h2>Service Provider Login</h2>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your professional email"
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <br />
          <hr /><br /><br />

          <button
            type="button"
            className="forgot-password-btn"
            onClick={() => alert("Forgot Password clicked!")}
            disabled={loading}
          >
            Forgot Password?
          </button>

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <div class="form-box register-form">
        <form className="form-box" onSubmit={handleRegisterSubmit}>
          <h2>Join as a Partner</h2>

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your contact number"
            required
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
          />

          <label>Service(s) Provided</label>
            <div className="service-input-container" style={{ position: "relative" }}>
            <div className="selected-services">
            {regServices.map((service, idx) => (
            <span key={idx} className="service-chip">
            {service}
              <button
                type="button"
                className="remove-chip-btn"
                onClick={() => {
                setRegServices(regServices.filter((_, i) => i !== idx));
                }}
              >
          &times;
              </button>
      </span>
    ))}
    <input
      type="text"
      placeholder="Start typing to select services"
      value={serviceInput}
      onChange={(e) => {
        setServiceInput(e.target.value);
        setShowDropdown(true);
      }}
      onFocus={() => setShowDropdown(true)}
      onBlur={() => {
        // delay hiding dropdown to allow click on options
        setTimeout(() => setShowDropdown(false), 150);
      }}
      style={{ border: "none", outline: "none", flexGrow: 1, minWidth: "150px" }}
    />
  </div>

  {showDropdown && (
    <ul className="service-dropdown" style={{
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: "150px",
      overflowY: "auto",
      border: "1px solid #ccc",
      backgroundColor: "grey",
      zIndex: 1000,
      listStyle: "none",
      margin: 0,
      padding: "5px 0",
      color: "white"
    }}>
      {availableServices
        .filter(
          (s) =>
            s.toLowerCase().includes(serviceInput.toLowerCase()) &&
            !regServices.includes(s)
        )
        .map((service, idx) => (
          <li
            key={idx}
            style={{ padding: "5px 10px", cursor: "pointer" }}
            onMouseDown={(e) => {
              // prevent blur event before onClick fires
              e.preventDefault();
            }}
            onClick={() => {
              setRegServices([...regServices, service]);
              setServiceInput("");
              setShowDropdown(false);
            }}
          >
            {service}
          </li>
        ))}
      {availableServices.filter(
        (s) =>
          s.toLowerCase().includes(serviceInput.toLowerCase()) &&
          !regServices.includes(s)
      ).length === 0 && (
        <li style={{ padding: "5px 10px", color: "#999" }}>No matching services</li>
      )}
    </ul>
  )}
</div>
          <label>Experience (years)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter your years of experience"
            required
            value={regExperience}
            onChange={(e) => setRegExperience(e.target.value)}
          />

          <label>Service Areas</label>
          <input
            type="text"
            placeholder="Label for service area (e.g., Downtown)"
            value={areaLabel}
            onChange={(e) => setAreaLabel(e.target.value)}
          />
          <div id="map" style={{ height: "300px", width: "100%", marginBottom: "10px" }}></div>

          <label>Radius (meters)</label>
          <input
            type="number"
            min="100"
            max="20000"
            placeholder="100 to 20000"
            value={radiusMeters}
            onChange={(e) => {
                const val = Number(e.target.value);
                if (val >= 100 && val <= 20000) setRadiusMeters(val);
            }}
          />
          <small style={{ color: "gray" }}>
              Must be between 100 and 20,000 meters (20 km)
          </small>


          <button type="button" onClick={addServiceArea} style={{ marginBottom: "15px" }}>
            Add Service Area
          </button>

          <div>
            <h4>Added Service Areas:</h4>
            <ul>
              {serviceAreas.map((area, idx) => (
                <li key={idx}>
                  <strong>{area.label}</strong> — Lat: {area.location.coordinates[1].toFixed(5)}, Lng: {area.location.coordinates[0].toFixed(5)}, Radius: {area.radiusMeters}m{" "}
                  <button type="button" onClick={() => removeServiceArea(idx)} style={{ marginLeft: "10px" }}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            />
            <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm your password"
        required
        value={regConfirmPassword}
        onChange={(e) => setRegConfirmPassword(e.target.value)}
      />

      <button type="submit" className="action-button" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
    </div>
  )}
</div>
);
};

export default ProviderLogin;
