import { LinearChart } from "@/components/charts/LinearChart"
import { title } from "../../components/primitives"
import { AccountsPieChart } from "@/components/charts/AccountsPieChart"
import { PatientsBarChart } from "@/components/charts/PatientsBarChart"
import BarChartInterActive from "@/components/charts/BarChartInterActive"

const SecretaryDashboard = () => {
    return (
        <section className="flex flex-1 flex-col items-start justify-start gap-4 px-8 w-full">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title({ size: "sm" })}>Dashboard</h1>
            </div>
            <div className="flex flex-row w-full h-fit max-w-full justify-evenly gap-4">
                <LinearChart />
                <PatientsBarChart />
            </div>
            <div className="w-full h-fit flex flex-row gap-4">
                <AccountsPieChart />
                <BarChartInterActive />
            </div>
            <div className="w-full h-fit flex flex-row gap-4">
                <AccountsPieChart />
                <LinearChart />
            </div>
        </section>
    )
}

export default SecretaryDashboard
