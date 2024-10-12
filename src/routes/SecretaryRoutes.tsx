import SecretaryNavbar from '@/components/secretary_navbar';
import SecretaryLayout from '@/layouts/secretary_layout';
import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom';

const SecretaryRoutes = () => {
    const { isLoaded, user } = useUser();

    if (!isLoaded) return
    console.log("secretary routes hit")

    return user?.publicMetadata.role == "secretary" ?
        (<div>
            <SecretaryLayout>
                <SecretaryNavbar />
                <Outlet />
            </SecretaryLayout>
        </div>
        )
        : user?.publicMetadata.role == "doctor" ? <Navigate to={"/unauthorized"} /> : <Navigate to="/sign-in" />
}

export default SecretaryRoutes
