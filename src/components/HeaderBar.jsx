import "../styles/headerbar.css";

export default function HeaderBar() {
  return (
    <div className="header-bar">

      <div>

        <h2>
          Good Morning, Dr Ravi 👋
        </h2>

        <p>
          Manage presurgical consent and educate your patients with 3D videos.
        </p>

      </div>

      <button className="create-btn">
        + Create New Consent
      </button>

    </div>
  );
}