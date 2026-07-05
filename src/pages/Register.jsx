import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
      speciality: "",
      hospital_name: "",
      phone: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleRegister =
    async () => {
      try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
  formData
);
        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (err) {
        console.log(err);

        alert(
          "Registration Failed"
        );
      }
    };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          Create Surgeon Account
        </h1>

        <input
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          name="speciality"
          placeholder="Speciality"
          onChange={handleChange}
        />

        <input
          name="hospital_name"
          placeholder="Hospital Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <button
          onClick={handleRegister}
        >
          Create Account
        </button>

      </div>

    </div>
  );
}