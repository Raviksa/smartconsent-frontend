
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import QuickCreate from "../components/QuickCreate";
import VideoCard from "../components/VideoCard";
import "../styles/dashboard.css";
import SubscriptionCard from "../components/SubscriptionCard";
import ConsentTable from "../components/ConsentTable";
import {
  FaClipboardList,
  FaCheckCircle,
  FaChartPie,
  FaVideo
} from "react-icons/fa";
import ProfileCard from "../components/ProfileCard";
import HeaderBar from "../components/HeaderBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

const [user, setUser] = useState(null);
const [stats, setStats] =
  useState({
    consentRequests: 0,
    completed: 0
  });
  const loadStats =
async () => {
  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/dashboard/stats`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setStats(
      res.data
    );

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
    return;
  }

  const storedUser =
    localStorage.getItem("user");

  if (storedUser) {
    setUser(
      JSON.parse(storedUser)
    );
  }
   loadStats();

}, [navigate]);

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />
      
       <div className="welcome-section">
  <div>
   <h1>
  Good Morning,
  Dr. {user?.full_name} 👋
</h1>

    <p>
      Manage presurgical consent and educate your patients with 3D videos.
    </p>
  </div>

  <button className="new-consent-btn">
    + Create New Consent
  </button>
</div>

       
        <div className="cards">
<StatCard
  title="Consent Requests"
  value={stats.consentRequests}
  icon={<FaClipboardList />}
/>

<StatCard
  title="Completed"
  value={stats.completed}
  icon={<FaCheckCircle />}
/>



        </div>

        <div
className="middle-row"
>

  <QuickCreate />

  <VideoCard />

</div>
<div className="bottom-row">

  <ConsentTable />

  <SubscriptionCard />

</div>

<div className="profile-row">

  <ProfileCard />

</div>

</div>

</div>
);
}