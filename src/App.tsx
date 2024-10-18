import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index";
import AboutPage from "./pages/about";
import { useUser } from "@clerk/clerk-react";
import PageNotFound from "./pages/page-not-found";
import SignIn from "./pages/sign-in";
import Unauthorized from "./pages/unauthorized";
import SecretaryRoutes from "./routes/SecretaryRoutes";
import CreateAccount from "./pages/secretary/Accounts";
import FacultyRoutes from "./routes/FacultyRoutes";
import FacultyHome from "./pages/faculty/FacultyHome";
import SecretaryDashboard from "./pages/secretary/Dashboard";
import { Toaster } from "sonner";
import MyPatients from "./pages/faculty/Patients";
import Appointments from "./pages/faculty/Appointments";
import AttendanceTracker from "./pages/AttendanceTracker";



function App() {
  const { isLoaded } = useUser();

  if (!isLoaded) return

  return (
    <>
      <Routes>
        {/*Public Routes */}
        <Route element={<IndexPage />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<Unauthorized />} path="/unauthorized" />
        <Route element={<PageNotFound />} path="*" />
        <Route element={<AboutPage />} path="/about" />

        {/* Secretary routes */}
        <Route element={<SecretaryRoutes />}>
          <Route element={<SecretaryDashboard />} path="/secretary/dashboard" />
          <Route element={<CreateAccount />} path="/secretary/accounts" />
          <Route element={<AttendanceTracker />} path="/attendance" />
        </Route>

        {/* Doctor routes */}
        <Route element={<FacultyRoutes />}>
          <Route element={<FacultyHome />} path="/faculty/home" />
          <Route element={<MyPatients />} path="/faculty/my-patients" />
          <Route element={<Appointments />} path="/faculty/appointments" />
        </Route>

      </Routes>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
