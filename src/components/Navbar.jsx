import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(
        JSON.parse(storedUser)
      );
    }
  }, []);

  return (
    <div className="navbar">

      <h2>
        Dashboard
      </h2>

      <div className="navbar-right">

        <FaBell
          className="bell-icon"
        />

        <div
          className="doctor-info"
        >
          <h4>
            {user?.full_name}
          </h4>

          <p>
            {user?.speciality}
          </p>
        </div>

      </div>

    </div>
  );
}