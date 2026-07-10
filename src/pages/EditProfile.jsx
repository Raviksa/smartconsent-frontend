import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/editProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );
  


export default function EditProfile() {

const navigate = useNavigate();
  const [formData, setFormData] = useState({

    full_name: storedUser?.full_name || "",

    email: storedUser?.email || "",

    speciality: storedUser?.speciality || "",

    hospital_name: storedUser?.hospital_name || "",

    phone: storedUser?.phone || ""

  });
  const saveProfile = async () => {

  try {
    console.log("Save Profile clicked");
    const token =
      localStorage.getItem("token");

    const res =
      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/surgeons/profile`,

        formData,

        {

          headers:{

            Authorization:
            `Bearer ${token}`

          }

        }

      );

  // Update localStorage
localStorage.setItem(
  "user",
  JSON.stringify(res.data)
);

// Update form immediately
setFormData({
  full_name: res.data.full_name,
  email: res.data.email,
  speciality: res.data.speciality,
  hospital_name: res.data.hospital_name,
  phone: res.data.phone || ""
});

   alert("Profile Updated");

navigate("/profile");
  }

  catch(err){

    console.log(err);

  }

};

  return (

    <DashboardLayout>

      <div className="page-container">

        <div className="card">

          <h1>Edit Profile</h1>

          <label>Full Name</label>

          <input
            type="text"
            value={formData.full_name}
            onChange={(e)=>
              setFormData({
                ...formData,
                full_name:e.target.value
              })
            }
          />

          <label>Email</label>

          <input
            type="email"
            value={formData.email}
            disabled
            className="readonly-input"
          />

          <label>Speciality</label>

          <input
            type="text"
            value={formData.speciality}
            onChange={(e)=>
              setFormData({
                ...formData,
                speciality:e.target.value
              })
            }
          />

          <label>Hospital Name</label>

          <input
            type="text"
            value={formData.hospital_name}
            onChange={(e)=>
              setFormData({
                ...formData,
                hospital_name:e.target.value
              })
            }
          />

          <label>Phone</label>

          <input
            type="text"
            value={formData.phone}
            onChange={(e)=>
              setFormData({
                ...formData,
                phone:e.target.value
              })
            }
          />

          <button
         className="primary-btn"
         onClick={saveProfile}
           >
       Save Changes
          </button>

        </div>

      </div>

    </DashboardLayout>

  );

}