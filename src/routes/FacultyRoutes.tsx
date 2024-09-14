import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom';

const FacultyRoutes = () => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) return

    return user?.publicMetadata.role == "faculty" ? <Outlet /> : user?.publicMetadata.role == "secretary" ? <Navigate to={"/unauthorized"} /> : <Navigate to="/sign-in" />
}

export default FacultyRoutes
