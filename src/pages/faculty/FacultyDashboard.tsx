import { UserButton } from "@clerk/clerk-react"
import { title } from "../../components/primitives"

const FacultyDashboard = () => {
    return (
        <section className="flex flex-col items-start justify-start gap-4 px-8 w-full">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Doctor Dashboard Home Page</h1>
                <UserButton/>
            </div>
        </section>
    )
}

export default FacultyDashboard
