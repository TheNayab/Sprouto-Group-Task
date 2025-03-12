import React from "react";
import { FiBell } from "react-icons/fi";
import axios from "axios"; // Import axios for API calls
import Cookies from "js-cookie"; // Import Cookies for token management
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const authToken = Cookies.get("token");
  const navigate = useNavigate();

  // Logout function
  const logOut = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/logout`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success("User logged out successfully");
        // Show success message
        Cookies.remove("token");

        navigate("/authentication");
      } else {
        toast.error("Failed to log out"); // Show error message
      }
    } catch (error: any) {
      console.log("Error during logout: ", error);
      toast.error("An error occurred during logout"); // Show error message
    }
  };

  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl  p-6 flex justify-between w-full border border-white/40">
      {/* Left Side - Logo */}
      <div className="flex  items-center space-x-2">
        <span className="text-xl font-bold text-blue-600">LOGO</span>
        <span className="text-gray-500">BASE</span>
      </div>

      {/* Right Side - Profile & Notification */}
      <div className="flex items-center ml-auto space-x-6">
        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <a
            href="#"
            className="text-blue-600 font-medium"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              logOut(); // Call the logout function
            }}
          >
            Logout
          </a>
        </div>
      </div>
      <ToastContainer aria-label={undefined} />
    </nav>
  );
};

export default Nav;
