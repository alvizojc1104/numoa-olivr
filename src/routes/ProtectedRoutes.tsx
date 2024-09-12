import { useAuth } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) return
    console.log("protected routes hit")
    return isSignedIn ? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default ProtectedRoutes
