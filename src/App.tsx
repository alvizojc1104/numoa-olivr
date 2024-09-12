import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index";
import AboutPage from "./pages/about";
import { useUser } from "@clerk/clerk-react";
import PageNotFound from "./pages/page-not-found";
import SignIn from "./pages/sign-in";
import Unauthorized from "./pages/unauthorized";
import SecretaryDashboard from "./pages/secretary/secretary-dashboard";
import SecretaryRoutes from "./routes/SecretaryRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import DoctorDashboard from "./pages/doctor/doctor-dashboard";



function App() {
  const { isLoaded, } = useUser();

  if (!isLoaded) return

  return (
    <Routes>
      {/*Public Routes */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignIn />} path="/sign-in" />
      <Route element={<Unauthorized />} path="/unauthorized" />
      <Route element={<PageNotFound />} path="*" />
      <Route element={<AboutPage />} path="/about" />

      {/* Secretary routes */}
      <Route element={<SecretaryRoutes />}>
        <Route element={<SecretaryDashboard />} path="/secretary" />
      </Route>

      {/* Doctor routes */}
      <Route element={<DoctorRoutes />}>
        <Route element={<DoctorDashboard />} path="/doctor" />
      </Route>
    </Routes>
  );
}

export default App;
