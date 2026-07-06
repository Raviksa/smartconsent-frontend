import {
  FaHome,
  FaFileAlt,
  FaUserFriends,
  FaCreditCard,
  FaUserCircle,
  FaSignOutAlt,
  FaFolderOpen
} from "react-icons/fa";

import { Link, useNavigate ,useLocation}
from "react-router-dom";

import "../styles/sidebar.css";


export default function Sidebar() {
  const navigate = useNavigate();
  const location =
  useLocation();

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Go to login page
    navigate("/");
  };

  return (
    <div className="sidebar">

      <h2 className="logo">
        SmartConsent
      </h2>

      <div className="menu">
<Link
  to="/dashboard"
  className={
    location.pathname === "/dashboard"
      ? "active-link"
      : ""
  }
>
  <FaHome />
  Dashboard
</Link>

   <Link
  to="/create-consent"
  className={
    location.pathname === "/create-consent"
      ? "active-link"
      : ""
  }
>
  <FaFileAlt />
  Create Consent
</Link>
<Link
  to="/patients"
  className={
    location.pathname === "/patients"
      ? "active-link"
      : ""
  }
>
  <FaUserFriends />
  Patients
</Link>

        <Link to="/subscription">
          <FaCreditCard />
          Subscription
        </Link>

        <Link to="/profile">
          <FaUserCircle />
          Profile
        </Link>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}