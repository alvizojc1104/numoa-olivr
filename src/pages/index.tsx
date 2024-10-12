import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

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

  console.log("user",user)

  return (
    <div className="container">
      {user?.publicMetadata.role == "faculty" ? <Navigate to={"/faculty/home"} /> :
        user?.publicMetadata.role == "secretary" ? <Navigate to={"/secretary/dashboard"} /> :
          <Navigate to={'/sign-in'} />}
    </div>
  )
}
