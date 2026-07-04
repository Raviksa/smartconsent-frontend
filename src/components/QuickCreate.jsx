import "../styles/quickcreate.css";

export default function QuickCreate() {
  return (
    <div className="quick-create">

      <h2>
        Quick Create Consent
      </h2>

      <select>
        <option>
          Orthopaedics
        </option>
      </select>

      <br />
      <br />

      <select>
        <option>
          Knee Surgery
        </option>
      </select>

      <br />
      <br />

      <select>
        <option>
          Total Knee Replacement
        </option>
      </select>

      <br />
      <br />

      <button>
        Generate Consent
      </button>

    </div>
  );
}