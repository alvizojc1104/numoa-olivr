import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index";
import AboutPage from "./pages/about";
import { SignedIn, useUser } from "@clerk/clerk-react";
import PageNotFound from "./pages/page-not-found";
import SignIn from "./pages/sign-in";
import Unauthorized from "./pages/unauthorized";
import SecretaryRoutes from "./routes/SecretaryRoutes";
import CreateAccount from "./pages/secretary/create-account";
import SecretaryNavbar from "./components/secretary_navbar";
import FacultyRoutes from "./routes/FacultyRoutes";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import { Toaster } from "sonner";



function App() {
  const { isLoaded, } = useUser();

  if (!isLoaded) return

  return (
    <>
      <SignedIn>
        <SecretaryNavbar />
      </SignedIn>
      <Routes>
        {/*Public Routes */}
        <Route element={<IndexPage />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<Unauthorized />} path="/unauthorized" />
        <Route element={<PageNotFound />} path="*" />
        <Route element={<AboutPage />} path="/about" />

        {/* Secretary routes */}
        <Route element={<SecretaryRoutes />}>
          <Route element={<CreateAccount />} path="/secretary/accounts" />
        </Route>

        {/* Doctor routes */}
        <Route element={<FacultyRoutes />}>
          <Route element={<FacultyDashboard />} path="/faculty" />
        </Route>
      </Routes>
      <Toaster richColors position="top-center"/>
    </>
  );
}

export default App;
