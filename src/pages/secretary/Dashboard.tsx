import { LinearChart } from "@/components/charts/LinearChart"
import { title } from "../../components/primitives"
import { AccountsPieChart } from "@/components/charts/AccountsPieChart"
import { PatientsBarChart } from "@/components/charts/PatientsBarChart"
import BarChartInterActive from "@/components/charts/BarChartInterActive"

const SecretaryDashboard = () => {
    return (
        <div>
            <h1 className={title({ size: "sm" })}>Dashboard</h1>
            <div className="flex flex-row w-full h-fit justify-evenly gap-4 mt-4">
                <LinearChart />
                <PatientsBarChart />
            </div>
            <div className="w-full h-fit flex flex-row gap-4">
                <AccountsPieChart />
                <BarChartInterActive />
            </div>
        </div>
    )
}

export default SecretaryDashboard
