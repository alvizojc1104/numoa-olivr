import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom';

const SecretaryRoutes = () => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) return
    console.log("secretary routes hit")

    return user?.publicMetadata.role == "secretary" ? <Outlet /> : user?.publicMetadata.role == "doctor" ? <Navigate to={"/unauthorized"} /> : <Navigate to="/sign-in" />
}

export default SecretaryRoutes
