import {
  useEffect,
  useState
} from "react";

import {
  FaHospital,
  FaCalendarAlt
} from "react-icons/fa";

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

      <div className="doctor-avatar">
        👨‍⚕️
      </div>

      <h2>
        Dr. {user?.full_name}
      </h2>

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
        <FaCalendarAlt />
        {" "}
       Plan Expires: 15 Aug 2026
      </p>

    </div>
  );
}