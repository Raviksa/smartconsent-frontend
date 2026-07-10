import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/createConsent.css";
import DashboardLayout
from "../components/DashboardLayout";
export default function CreateConsent() {

  const [
  generatedConsent,
  setGeneratedConsent
] = useState("");

 const [
  additionalInstructions,
  setAdditionalInstructions
] = useState("");

  const risks = [
  "Diabetes",
  "Obesity",
  "Smoking",
  "Previous Surgery",
  "Cardiac Disease",
  "Kidney Disease",
  "Anticoagulants"
];
const surgicalTechniques = [
"Conventional Surgery",
"Minimally Invasive",
"Robotic Assisted",
"Navigation Assisted",
"Computer Assisted",
"Revision Surgery"
];
const patientComplexity = [
"High Risk Patient",
"Severe Deformity",
"Bone Loss",
"Previous Surgery",
"Infection",
"Morbid Obesity",
"Osteoporosis"
];
const perioperativeCare = [
"Blood Transfusion May Be Required",
"Drain May Be Inserted",
"Tissue Sample Will Be Sent for Biopsy",
"Physiotherapy Required",
"Walking Aid (Walker/Crutches)",
"ICU Observation May Be Required"
];
const [selectedRisks,setSelectedRisks] = useState([]);
const [selectedTechniques, setSelectedTechniques] = useState([]);

const [selectedComplexity, setSelectedComplexity] = useState([]);

const [selectedCare, setSelectedCare] = useState([]);
  const [
  selectedIllustrations,
  setSelectedIllustrations
] = useState([]);
  const [patients, setPatients] =
    useState([]);

  const [procedures, setProcedures] =
    useState([]);

  const [illustrations,
  setIllustrations] =
    useState([]);

  const [selectedPatient,
  setSelectedPatient] =
    useState(null);

  const [selectedProcedure,
  setSelectedProcedure] =
    useState(null);

  useEffect(() => {
    loadPatients();
    loadProcedures();
  }, []);

  const loadPatients =
  async () => {
    try {

      const token =
        localStorage.getItem("token");
     
      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/patients`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setPatients(
        res.data
      );

    } catch (err) {
      console.log(err);
    }
  };

  const loadProcedures =
  async () => {
    try {
      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/procedures`
        );

      setProcedures(
        res.data
      );

    } catch (err) {
      console.log(err);
    }
  };
  const loadIllustrations =
  async (procedureId) => {

    try {

      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/procedure-illustrations`
        );

      const filtered =
        res.data.filter(
          i =>
            i.procedure_id ==
            procedureId
        );

      setIllustrations(
        filtered
      );

    } catch (err) {
      console.log(err);
    }
  };
const generateConsent = async () => {

  console.log("Generate clicked");

  setLoadingDraft(true);   // <-- ADD THIS

  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/generate-consent`,
        {
          patient: selectedPatient,
          procedure: selectedProcedure,
          risks: selectedRisks,
          surgicalTechniques: selectedTechniques,
          patientComplexity: selectedComplexity,
          perioperativeCare: selectedCare,
          instructions: additionalInstructions,
          language
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    setGeneratedConsent(res.data.consent);

  }
  catch(err){

    console.log(err);

  }
  finally{

    setLoadingDraft(false);   // <-- ALWAYS stop loading

  }

};
const generatePdf =
async () => {


  try {

    const selectedImages =
      illustrations.filter(
        i =>
          selectedIllustrations.includes(
            i.id
          )
      );
console.log(selectedImages);
const token =
  localStorage.getItem("token");

console.log("Sending language:", language);

const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/pdf/generate`,
  {
    patient: selectedPatient,
    procedure: selectedProcedure,
    consent: generatedConsent,
    illustrations: selectedImages,
    language
  },
  {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
    const file =
      new Blob(
        [res.data],
        {
          type:
            "application/pdf"
        }
      );

    const url =
      window.URL.createObjectURL(
        file
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;
    link.download =
      "Consent.pdf";

    document.body.appendChild(
      link
    );

    link.click();
    link.remove();

  } catch (err) {
    setLoadingDraft(false);
    console.log(err);
  }
};
const [language, setLanguage] =
useState("English");

const [loadingDraft, setLoadingDraft] = useState(false);
  return (
    <DashboardLayout>
   <div className="page-container">
     <h1 className="page-title">
  Create Consent
     </h1>
     <p>Patients Loaded: {patients.length}</p>
     <p>Procedures Loaded: {procedures.length}</p>
     
    <div className="top-section">

  <div className="card">

    <h3>Patient</h3>

    <select
      onChange={(e) => {
        const patient =
          patients.find(
            p =>
              p.id ==
              e.target.value
          );

        setSelectedPatient(
          patient
        );
      }}
    >
      <option>
        Select Patient
      </option>

      {
        patients.map(
          patient => (
            <option
              key={patient.id}
              value={patient.id}
            >
              {patient.full_name}
            </option>
          )
        )
      }
    </select>

    {
      selectedPatient && (

        <div>

          <p>
            Diagnosis:
            {" "}
            {
              selectedPatient.diagnosis
            }
          </p>

          <p>
            Age:
            {" "}
            {
              selectedPatient.age
            }
          </p>

          <p>
            Side:
            {" "}
            {
              selectedPatient.side
            }
          </p>

        </div>

      )
    }

  </div>

  <div className="card">

    <h3>
      Procedure
    </h3>

    <select
      onChange={(e) => {

        const procedure =
          procedures.find(
            p =>
              p.id ==
              e.target.value
          );

        setSelectedProcedure(
          procedure
        );

        loadIllustrations(
          e.target.value
        );
      }}
    >
      <option>
        Select Procedure
      </option>

      {
        procedures.map(
          p => (
            <option
              key={p.id}
              value={p.id}
            >
              {p.name}
            </option>
          )
        )
      }
    </select>

    {
      selectedProcedure && (

        <div className="video-box">

          <h3>
            Procedure Video
          </h3>

          <video
            controls
          >
            <source
              src={
                selectedProcedure.video_url
              }
              type="video/mp4"
            />
          </video>

        </div>

      )
    }

    {
      illustrations.length > 0 && (

        <div>

          <h3>
            Illustrations
          </h3>

          <div
            className="illustration-grid"
          >

            {
              illustrations.map(
                illustration => (

                  <div
                    key={
                      illustration.id
                    }
                    className="illustration-card"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedIllustrations.includes(
                          illustration.id
                        )
                      }
                      onChange={() => {

                        if (
                          selectedIllustrations.includes(
                            illustration.id
                          )
                        ) {

                          setSelectedIllustrations(
                            selectedIllustrations.filter(
                              id =>
                                id !==
                                illustration.id
                            )
                          );

                        } else {

                          setSelectedIllustrations([
                            ...selectedIllustrations,
                            illustration.id
                          ]);

                        }
                      }}
                    />

                    <img
                      src={
                        illustration.image_url
                      }
                    />

                    <p>
                      {
                        illustration.caption
                      }
                    </p>

                  </div>

                )
              )
            }

          </div>

        </div>

      )
    }

  </div>
</div>

      
    
<div className="card"></div>



<div className="options-grid">

  <div className="option-card">

    <h3>Patient Risk Factors</h3>

    {risks.map(risk => (

      <label
        key={risk}
        className="checkbox-item"
      >

        <input
          type="checkbox"
          checked={selectedRisks.includes(risk)}
          onChange={() => {

            if(selectedRisks.includes(risk)){

              setSelectedRisks(
                selectedRisks.filter(
                  r => r !== risk
                )
              );

            }else{

              setSelectedRisks([
                ...selectedRisks,
                risk
              ]);

            }

          }}
        />

        {risk}

      </label>

    ))}

  </div>

  <div className="option-card">
  <h3>Surgical Technique</h3>

  {surgicalTechniques.map((item) => (
    <label key={item} className="checkbox-item">
      <input
        type="checkbox"
        checked={selectedTechniques.includes(item)}
        onChange={() => {
          if (selectedTechniques.includes(item)) {
            setSelectedTechniques(
              selectedTechniques.filter((t) => t !== item)
            );
          } else {
            setSelectedTechniques([
              ...selectedTechniques,
              item,
            ]);
          }
        }}
      />
      {item}
    </label>
  ))}
</div>

 <div className="option-card">
  <h3>Patient Complexity</h3>

  {patientComplexity.map((item) => (
    <label key={item} className="checkbox-item">
      <input
        type="checkbox"
        checked={selectedComplexity.includes(item)}
        onChange={() => {
          if (selectedComplexity.includes(item)) {
            setSelectedComplexity(
              selectedComplexity.filter((c) => c !== item)
            );
          } else {
            setSelectedComplexity([
              ...selectedComplexity,
              item,
            ]);
          }
        }}
      />
      {item}
    </label>
  ))}
</div>
<div className="option-card">
  <h3>Perioperative & Postoperative Care</h3>

  {perioperativeCare.map((item) => (
    <label key={item} className="checkbox-item">
      <input
        type="checkbox"
        checked={selectedCare.includes(item)}
        onChange={() => {
          if (selectedCare.includes(item)) {
            setSelectedCare(
              selectedCare.filter((c) => c !== item)
            );
          } else {
            setSelectedCare([
              ...selectedCare,
              item,
            ]);
          }
        }}
      />
      {item}
    </label>
  ))}
</div>
</div>

<div className="card"></div>
<h3>
Surgeon's Additional Notes
</h3>

<textarea
  className="instruction-textarea"
  rows="5"
  value={additionalInstructions}
  onChange={(e) =>
    setAdditionalInstructions(
      e.target.value
    )
  }
/>
<h3>
Regional Language
</h3>

<select
  value={language}
  onChange={(e) =>
    setLanguage(e.target.value)
  }
>
  <option value="English">
    English Only
  </option>

  <option value="Marathi">
    English + Marathi
  </option>

  <option value="Hindi">
    English + Hindi
  </option>

  <option value="Gujarati">
    English + Gujarati
  </option>

  <option value="Tamil">
    English + Tamil
  </option>
</select>
<button
  className="primary-btn"
  onClick={generateConsent}
  disabled={loadingDraft}
>
  {loadingDraft
    ? "Generating..."
    : "Generate AI Draft"}
</button>
{loadingDraft && (

<div className="ai-loading">

  <div className="spinner"></div>

  <h3>Please wait...</h3>

  <p>
    AI is generating your informed consent draft.
  </p>

  <p>
    Reviewing patient information...
  </p>

  <p>
    Personalizing surgical risks...
  </p>

  <p>
    Preparing multilingual draft...
  </p>

  <p className="loading-note">
    This usually takes 10–20 seconds.
  </p>

</div>

)}
<textarea
  className="consent-textarea"
  value={generatedConsent}
  onChange={(e) =>
    setGeneratedConsent(
      e.target.value
    )
  }
/>
<button
  className="primary-btn"
  onClick={generatePdf}
>
  Generate PDF
</button>
    </div>
    </DashboardLayout>
  );

}


