import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // await axios.post("https://your-backend.com/api/logout");

        // Clear the token or any other stored data
        localStorage.removeItem("token");

        // Redirect to login page
        navigate("/login/customer");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, [navigate]);

  return null; 
};

export default Logout;
