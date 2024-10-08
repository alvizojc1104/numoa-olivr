import { useUser } from "@clerk/clerk-react";
import SecretaryLayout from "../layouts/secretary_layout";
import SecretaryDashboard from "./secretary/secretary-dashboard";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "./faculty/FacultyDashboard";

export default function IndexPage() {
  const { isLoaded, user } = useUser();

  //always load clerk first
  if (!isLoaded) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <h1>Error logging in.</h1>
      </div>
    )
  }

  return (
    <div className="container">
      {user?.publicMetadata.role == "faculty" ? <FacultyDashboard /> :
        user?.publicMetadata.role == "secretary" ? <SecretaryLayout> <SecretaryDashboard /> </SecretaryLayout> :
          <Navigate to={'/sign-in'} />}
    </div>
  )
}
