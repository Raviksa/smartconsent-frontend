import DashboardLayout
from "../components/DashboardLayout";

export default function Profile() {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (
    <DashboardLayout>

      <div className="page-container">

        <div className="card">

          <h1>
            Profile
          </h1>

          <h2>
            Dr. {user?.full_name}
          </h2>

          <p>
            {user?.speciality}
          </p>

          <hr />

          <p>
            <b>Email:</b>
            {" "}
            {user?.email}
          </p>

          <p>
            <b>Hospital:</b>
            {" "}
            {user?.hospital_name}
          </p>

          <p>
            <b>Phone:</b>
            {" "}
            {user?.phone}
          </p>

          <p>
            <b>Subscription:</b>
            Active
          </p>

          <button
            className="primary-btn"
          >
            Edit Profile
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}