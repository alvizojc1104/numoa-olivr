import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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

export const description = "A linear line chart"

const chartData = [
    { month: "January", desktop: 124 },
    { month: "February", desktop: 281 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 198 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 138 },
    { month: "August", desktop: 159 },
    { month: "September", desktop: 287 },
]

const chartConfig = {
    desktop: {
        label: "Sales",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function LinearChart() {
    return (
        <Card className="flex-1 w-full max-w h-fit">
            <CardHeader>
                <CardTitle>Product Sales</CardTitle>
                <CardDescription>January - September 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="desktop"
                            type="linear"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Sales up by 5.2% this month <TrendingUp className="h-3 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing product sales for the last 8 months
                </div>
            </CardFooter>
        </Card>
    )
}
