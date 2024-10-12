import FacultyLayout from '@/layouts/FacultyLayout';
import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom';

const FacultyRoutes = () => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) return

    return user?.publicMetadata.role == "faculty" ?
        (
            <FacultyLayout>
                <Outlet />
            </FacultyLayout>
        )
        : user?.publicMetadata.role == "secretary" ? <Navigate to={"/unauthorized"} /> : <Navigate to="/sign-in" />
}

export default FacultyRoutes
