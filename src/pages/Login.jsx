import {
  useNavigate,
  Link
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaGoogle,
  FaCheckCircle,
  FaShieldAlt,
  FaUserMd
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
        password,
      }
    );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);

      alert(
        "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* LEFT PANEL */}

        <div className="login-left">

          <h1>
            SmartConsent
            <br />
            Solutions
          </h1>

          <h2>
            Interactive Videos
            <br />
            Better Understanding
            <br />
            Informed Consent
          </h2>

          <div className="features">

            <p>
              <FaUserMd />
              <span>
                Audio-Visual Patient Education
              </span>
            </p>

            <p>
              <FaCheckCircle />
              <span>
                Legally Compliant
              </span>
            </p>

            <p>
              <FaShieldAlt />
              <span>
                Secure & Private
              </span>
            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="login-right">

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
              <input type="checkbox" />
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
          
          {false && (
  <>
    <div className="divider">
      or continue with
    </div>

    <button className="social-btn">
      <FaGoogle />
      <span>
        Continue with Google
      </span>
    </button>
  </>
)}

          

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