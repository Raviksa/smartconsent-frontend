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
        Dr Ravi Sarode
      </h2>

      <p>
        Orthopaedic Surgeon
      </p>

      <hr />

      <p>
        <FaHospital />
        Smart Multispeciality Hospital
      </p>

      <p>
        <FaCalendarAlt />
        Expires:
        15 Aug 2026
      </p>

    </div>
  );
}