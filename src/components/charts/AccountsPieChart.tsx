import * as React from "react"
import { SquareArrowOutUpRight } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
import moment from "moment"
import { Link } from "@nextui-org/react"

export const description = "A donut chart with text"

const chartData = [
  { account: "Patients", visitors: 415, fill: "var(--color-chrome)" },
  { account: "Optomerist Teacher", visitors: 33, fill: "var(--color-safari)" },
  { account: "Students", visitors: 287, fill: "var(--color-firefox)" },
]

const chartConfig = {
  visitors: {
    label: "Accounts",
  },
  chrome: {
    label: "Patients",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Optometrist",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Students",
    color: "hsl(var(--chart-3))",
  }
} satisfies ChartConfig

export function AccountsPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="min-w-fit   max-w-fit">
      <CardHeader className="items-center pb-0">
        <CardTitle>Accounts</CardTitle>
        <CardDescription>{`as of ${moment(new Date).format("MMMM D, yyyy")}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="account"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Accounts
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-primary">
          <Link href="#">Manage Accounts</Link> <SquareArrowOutUpRight className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
            Create, update, or delete accounts.
        </div>
      </CardFooter>
    </Card>
  )
}
