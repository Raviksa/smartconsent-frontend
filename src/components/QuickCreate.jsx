import {
  useNavigate
}
from "react-router-dom";

import "../styles/quickcreate.css";

export default function QuickCreate() {

  const navigate =
    useNavigate();

  return (
    <div className="quick-create">

      <h2>
        🩺 Start New Consent
      </h2>

      <p>
        Create an AI-assisted informed
        consent and educate your patient
        with educational videos and illustrations.
      </p>

      <button
        onClick={() =>
          navigate(
            "/create-consent"
          )
        }
      >
        + Start New Consent
      </button>

    </div>
  );
}