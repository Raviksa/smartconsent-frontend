import { useEffect, useState }
from "react";

import {
  FaHospital,
  FaCalendar
}
from "react-icons/fa";

import "../styles/profilecard.css";

export default function ProfileCard() {
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
    <div className="profile-card">

      <h3>
        {user?.full_name}
      </h3>

      <p>
        {user?.speciality}
      </p>

      <hr />

      <p>
        <FaHospital />
        {" "}
        {user?.hospital_name}
      </p>

      <p>
        <FaCalendar />
        {" "}
        Subscription Active
      </p>

    </div>
  );
}