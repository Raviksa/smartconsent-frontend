import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaShieldAlt,
  FaRobot,
  FaLanguage,
  FaVideo,
  FaFileMedical
} from "react-icons/fa";

import "../styles/login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/auth/login`,

        {
          email,
          password
        }

      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    }

    catch (err) {

      console.log(err);

      alert("Invalid Email or Password");

    }

  };

  return (

    <div className="login-page">

      {/* HERO VIDEO */}

      <div className="hero-section">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >

          <source
            src="/videos/login-hero.mp4"
            type="video/mp4"
          />

        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <h1>
            SmartConsent Solutions
          </h1>

          <h2>
            AI Powered Surgical Consent Platform
          </h2>

          <p>

            Helping surgeons educate patients
            through interactive procedure videos,
            multilingual AI consent generation,
            and digital documentation.

          </p>

        </div>

      </div>

      {/* LOWER SECTION */}

      <div className="bottom-section">

        {/* LEFT CARD */}

        <div className="info-card">

          <h2>
            Why SmartConsent?
          </h2>

          <div className="feature-card">

            <FaRobot />

            <span>
              AI Generated Consent Draft
            </span>

          </div>

          <div className="feature-card">

            <FaLanguage />

            <span>
              Multilingual Patient Education
            </span>

          </div>

          <div className="feature-card">

            <FaVideo />

            <span>
              Interactive 3D Procedure Videos
            </span>

          </div>

          <div className="feature-card">

            <FaFileMedical />

            <span>
              Digital Consent Documentation
            </span>

          </div>

          <div className="feature-card">

            <FaShieldAlt />

            <span>
              Secure & Private
            </span>

          </div>

        </div>

        {/* LOGIN CARD */}

        <div className="login-card">

          <h1>
            Welcome Back!
          </h1>

          <p className="subtitle">

            Login to your SmartConsent account

          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <div className="remember-row">

            <label>

              <input
                type="checkbox"
              />

              Remember Me

            </label>

            <a href="#">

              Forgot Password?

            </a>

          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
          >

            Login

          </button>

          <p className="signup">

            Don't have an account?{" "}

            <Link to="/register">

              Sign Up

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}