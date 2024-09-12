import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

const chartData = [
  { month: "April", desktop: 186 },
  { month: "May", desktop: 305 },
  { month: "June", desktop: 237 },
  { month: "July", desktop: 73 },
  { month: "August", desktop: 209 },
  { month: "September", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PatientsBarChart() {
  return (
    <Card className="flex flex-1 flex-col max-w-[500px] h-fit">
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>April 2024 - September 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
           More than 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total patients for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
