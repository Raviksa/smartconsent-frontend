import { useEffect, useState } from "react";
import axios from "axios";

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
useEffect(() => {
  loadPatients();
  loadProcedures();

  console.log(
    "API URL:",
    import.meta.env.VITE_API_URL
  );
}, []);
const [
  selectedRisks,
  setSelectedRisks
] = useState([]);

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
  const generateConsent =
async () => {

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
      instructions: additionalInstructions
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
    setGeneratedConsent(
      res.data.consent
    );

  } catch (err) {
    console.log(err);
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

const res =
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/pdf/generate`,
    {
      patient: selectedPatient,
      procedure: selectedProcedure,
      consent: generatedConsent,
      illustrations: selectedImages
    },
    {
      responseType: "blob",
      headers: {
        Authorization:
          `Bearer ${token}`
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
    console.log(err);
  }
};
  return (
    
    <div
      style={{
        padding: "30px"
      }}
    >
      <h1>
        Create Consent
      </h1>
     <p>Patients Loaded: {patients.length}</p>
<p>Procedures Loaded: {procedures.length}</p>

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

<div>

  <h3>
    Procedure Video
  </h3>

  <video
    width="700"
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

  {
illustrations.map(
  illustration => (

    <div
      key={
        illustration.id
      }
      style={{
        marginBottom: "20px"
      }}
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
        width="200"
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

)
}
<h3>
Patient Specific Risks
</h3>

{
risks.map(
  risk => (

    <div
      key={risk}
    >

      <input
        type="checkbox"
        checked={
          selectedRisks.includes(
            risk
          )
        }
        onChange={() => {

          if (
            selectedRisks.includes(
              risk
            )
          ) {

            setSelectedRisks(
              selectedRisks.filter(
                r => r !== risk
              )
            );

          } else {

            setSelectedRisks([
              ...selectedRisks,
              risk
            ]);
          }
        }}
      />

      {risk}

    </div>

  )
)
}
<h3>
Additional Instructions
</h3>

<textarea
  rows="5"
  style={{
    width: "100%"
  }}
  value={
    additionalInstructions
  }
  onChange={(e) =>
    setAdditionalInstructions(
      e.target.value
    )
  }
/>
<button
  onClick={
    generateConsent
  }
>
  Generate AI Draft
</button>

<textarea
  rows="20"
  style={{
    width: "100%"
  }}
  value={
    generatedConsent
  }
  onChange={(e) =>
    setGeneratedConsent(
      e.target.value
    )
  }
  
/>
<button
  onClick={
    generatePdf
  }
>
Generate PDF
</button>
    </div>
  );

}


