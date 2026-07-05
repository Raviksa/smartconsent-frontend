import {
  FaUserMd,
  FaHospital,
  FaCalendarAlt
} from "react-icons/fa";

import "../styles/profilecard.css";

export default function ProfileCard() {
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
        Expires:
        15 Aug 2026
      </p>

    </div>
  );
}