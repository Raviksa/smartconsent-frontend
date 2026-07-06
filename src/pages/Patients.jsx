import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/patients.css";
import DashboardLayout
from "../components/DashboardLayout";

export default function Patients() {
const [showForm, setShowForm] =
  useState(false);

const [formData, setFormData] =
  useState({
    surgeon_id: 2,
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    mrn: "",
    diagnosis: "",
    side: "",
    suggested_procedure: "",
    notes: ""
  });

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

 const loadPatients = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/patients`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

    setPatients(res.data);
  } catch (err) {
    console.log(err);
  }
};
  const [search,
setSearch] =
useState("");
    const savePatient = async () => {
  try {
    const token =
      localStorage.getItem("token");

    if (editingId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}api/patients/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } else {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/patients`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

    loadPatients();

    setShowForm(false);

    setEditingId(null);

    setFormData({
      full_name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      mrn: "",
      diagnosis: "",
      side: "",
      suggested_procedure: "",
      notes: ""
    });

  } catch (err) {
    console.log(err);
  }
};
const deletePatient =
async (id) => {
  try {

    const token =
      localStorage.getItem("token");

    await axios.delete(
  `${import.meta.env.VITE_API_URL}/api/patients/${id}`,
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);

    loadPatients();

  } catch (err) {
    console.log(err);
  }
};
const [editingId,
setEditingId] =
useState(null);
  return (

    <DashboardLayout>
    <div className="patients-container">
    <div className="patients-page">

      <div className="patients-header">
        <h1>Patients</h1>
       <input
  type="text"
  placeholder="Search Patient"
  value={search}
  onChange={(e)=>
    setSearch(
      e.target.value
    )
  }
/>
       <button
  onClick={() =>
    setShowForm(true)
  }
>
  + Add Patient
</button>
      </div>

      <table className="patients-table">
<thead>
<tr>
  <th>Name</th>
  <th>Age</th>
  <th>Gender</th>
  <th>Phone</th>
  <th>Email</th>
  <th>MRN</th>
  <th>Side</th>
  <th>Diagnosis</th>
  <th>Procedure</th>
  <th>Notes</th>
  <th>Actions</th>
</tr>
</thead>

        <tbody>

          {patients.filter((patient)=>
  patient.full_name
  .toLowerCase()
  .includes(
    search.toLowerCase()
  )
).map((patient) => (
            <tr key={patient.id}>

              <td>{patient.full_name}</td>
<td>{patient.age}</td>
<td>{patient.gender}</td>
<td>{patient.phone}</td>
<td>{patient.email}</td>
<td>{patient.mrn}</td>
<td>{patient.side}</td>
<td>{patient.diagnosis}</td>
<td>{patient.suggested_procedure}</td>
<td>{patient.notes}</td>

<td className="action-buttons">

  <button
    className="edit-btn"
    onClick={() => {
      setFormData(patient);
      setEditingId(patient.id);
      setShowForm(true);
    }}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deletePatient(patient.id)
    }
  >
    Delete
  </button>

</td>




            </tr>
          ))}

        </tbody>
      
 </table>
 {
showForm && (

<div className="modal-overlay">

  <div className="patient-modal">

    <div className="modal-header">

      <h2>
        Add Patient
      </h2>

      <button
        className="close-btn"
        onClick={() =>
          setShowForm(false)
        }
      >
        ✕
      </button>

    </div>

    <div className="patient-form">

      <input
        placeholder="Patient Name"
        value={formData.full_name}
        onChange={(e) =>
          setFormData({
            ...formData,
            full_name:
              e.target.value
          })
        }
      />

      <input
        placeholder="Age"
        value={formData.age}
        onChange={(e) =>
          setFormData({
            ...formData,
            age:
              e.target.value
          })
        }
      />

      <select
        value={formData.gender}
        onChange={(e) =>
          setFormData({
            ...formData,
            gender:
              e.target.value
          })
        }
      >
        <option value="">
          Select Gender
        </option>

        <option>
          Male
        </option>

        <option>
          Female
        </option>
      </select>

      <input
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone:
              e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email:
              e.target.value
          })
        }
      />

      <input
        placeholder="Address"
        value={formData.address}
        onChange={(e) =>
          setFormData({
            ...formData,
            address:
              e.target.value
          })
        }
      />

      <input
        placeholder="MRN / UHID"
        value={formData.mrn}
        onChange={(e) =>
          setFormData({
            ...formData,
            mrn:
              e.target.value
          })
        }
      />

      <input
        placeholder="Diagnosis"
        value={formData.diagnosis}
        onChange={(e) =>
          setFormData({
            ...formData,
            diagnosis:
              e.target.value
          })
        }
      />

      <select
        value={formData.side}
        onChange={(e) =>
          setFormData({
            ...formData,
            side:
              e.target.value
          })
        }
      >
        <option value="">
          Select Side
        </option>

        <option>
          Right
        </option>

        <option>
          Left
        </option>

        <option>
          Bilateral
        </option>
      </select>

      <input
        placeholder="Suggested Procedure"
        value={
          formData.suggested_procedure
        }
        onChange={(e) =>
          setFormData({
            ...formData,
            suggested_procedure:
              e.target.value
          })
        }
      />

      <textarea
        placeholder="Notes"
        value={formData.notes}
        onChange={(e) =>
          setFormData({
            ...formData,
            notes:
              e.target.value
          })
        }
      />

      <button
        className="save-btn"
        onClick={savePatient}
      >
        Save Patient
      </button>

    </div>

  </div>

</div>

)
}
     
</div>
    </div>
    </DashboardLayout>
  );
}