import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateConsent from "./pages/CreateConsent";
import Subscription from "./pages/Subscription";
import Patients from "./pages/Patients";
import Profile from "./pages/Profile";
import Register from "./pages/Register";



function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/create-consent"
          element={<CreateConsent />}
        />

        <Route
          path="/subscription"
          element={<Subscription />}
        />

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
    
      </Routes>

    </BrowserRouter>
  );
}

export default App;