"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
    { date: "2024-04-01", assessments: 222, acuity: 150 },
    { date: "2024-04-02", assessments: 97, acuity: 180 },
    { date: "2024-04-03", assessments: 167, acuity: 120 },
    { date: "2024-04-04", assessments: 242, acuity: 260 },
    { date: "2024-04-05", assessments: 373, acuity: 290 },
    { date: "2024-04-06", assessments: 301, acuity: 340 },
    { date: "2024-04-07", assessments: 245, acuity: 180 },
    { date: "2024-04-08", assessments: 409, acuity: 320 },
    { date: "2024-04-09", assessments: 59, acuity: 110 },
    { date: "2024-04-10", assessments: 261, acuity: 190 },
    { date: "2024-04-11", assessments: 327, acuity: 350 },
    { date: "2024-04-12", assessments: 292, acuity: 210 },
    { date: "2024-04-13", assessments: 342, acuity: 380 },
    { date: "2024-04-14", assessments: 137, acuity: 220 },
    { date: "2024-04-15", assessments: 120, acuity: 170 },
    { date: "2024-04-16", assessments: 138, acuity: 190 },
    { date: "2024-04-17", assessments: 446, acuity: 360 },
    { date: "2024-04-18", assessments: 364, acuity: 410 },
    { date: "2024-04-19", assessments: 243, acuity: 180 },
    { date: "2024-04-20", assessments: 89, acuity: 150 },
    { date: "2024-04-21", assessments: 137, acuity: 200 },
    { date: "2024-04-22", assessments: 224, acuity: 170 },
    { date: "2024-04-23", assessments: 138, acuity: 230 },
    { date: "2024-04-24", assessments: 387, acuity: 290 },
    { date: "2024-04-25", assessments: 215, acuity: 250 },
    { date: "2024-04-26", assessments: 75, acuity: 130 },
    { date: "2024-04-27", assessments: 383, acuity: 420 },
    { date: "2024-04-28", assessments: 122, acuity: 180 },
    { date: "2024-04-29", assessments: 315, acuity: 240 },
    { date: "2024-04-30", assessments: 454, acuity: 380 },
    { date: "2024-05-01", assessments: 165, acuity: 220 },
    { date: "2024-05-02", assessments: 293, acuity: 310 },
    { date: "2024-05-03", assessments: 247, acuity: 190 },
    { date: "2024-05-04", assessments: 385, acuity: 420 },
    { date: "2024-05-05", assessments: 481, acuity: 390 },
    { date: "2024-05-06", assessments: 498, acuity: 520 },
    { date: "2024-05-07", assessments: 388, acuity: 300 },
    { date: "2024-05-08", assessments: 149, acuity: 210 },
    { date: "2024-05-09", assessments: 227, acuity: 180 },
    { date: "2024-05-10", assessments: 293, acuity: 330 },
    { date: "2024-05-11", assessments: 335, acuity: 270 },
    { date: "2024-05-12", assessments: 197, acuity: 240 },
    { date: "2024-05-13", assessments: 197, acuity: 160 },
    { date: "2024-05-14", assessments: 448, acuity: 490 },
    { date: "2024-05-15", assessments: 473, acuity: 380 },
    { date: "2024-05-16", assessments: 338, acuity: 400 },
    { date: "2024-05-17", assessments: 499, acuity: 420 },
    { date: "2024-05-18", assessments: 315, acuity: 350 },
    { date: "2024-05-19", assessments: 235, acuity: 180 },
    { date: "2024-05-20", assessments: 177, acuity: 230 },
    { date: "2024-05-21", assessments: 82, acuity: 140 },
    { date: "2024-05-22", assessments: 81, acuity: 120 },
    { date: "2024-05-23", assessments: 252, acuity: 290 },
    { date: "2024-05-24", assessments: 294, acuity: 220 },
    { date: "2024-05-25", assessments: 201, acuity: 250 },
    { date: "2024-05-26", assessments: 213, acuity: 170 },
    { date: "2024-05-27", assessments: 420, acuity: 460 },
    { date: "2024-05-28", assessments: 233, acuity: 190 },
    { date: "2024-05-29", assessments: 78, acuity: 130 },
    { date: "2024-05-30", assessments: 340, acuity: 280 },
    { date: "2024-05-31", assessments: 178, acuity: 230 },
    { date: "2024-06-01", assessments: 178, acuity: 200 },
    { date: "2024-06-02", assessments: 470, acuity: 410 },
    { date: "2024-06-03", assessments: 103, acuity: 160 },
    { date: "2024-06-04", assessments: 439, acuity: 380 },
    { date: "2024-06-05", assessments: 88, acuity: 140 },
    { date: "2024-06-06", assessments: 294, acuity: 250 },
    { date: "2024-06-07", assessments: 323, acuity: 370 },
    { date: "2024-06-08", assessments: 385, acuity: 320 },
    { date: "2024-06-09", assessments: 438, acuity: 480 },
    { date: "2024-06-10", assessments: 155, acuity: 200 },
    { date: "2024-06-11", assessments: 92, acuity: 150 },
    { date: "2024-06-12", assessments: 492, acuity: 420 },
    { date: "2024-06-13", assessments: 81, acuity: 130 },
    { date: "2024-06-14", assessments: 426, acuity: 380 },
    { date: "2024-06-15", assessments: 307, acuity: 350 },
    { date: "2024-06-16", assessments: 371, acuity: 310 },
    { date: "2024-06-17", assessments: 475, acuity: 520 },
    { date: "2024-06-18", assessments: 107, acuity: 170 },
    { date: "2024-06-19", assessments: 341, acuity: 290 },
    { date: "2024-06-20", assessments: 408, acuity: 450 },
    { date: "2024-06-21", assessments: 169, acuity: 210 },
    { date: "2024-06-22", assessments: 317, acuity: 270 },
    { date: "2024-06-23", assessments: 480, acuity: 530 },
    { date: "2024-06-24", assessments: 132, acuity: 180 },
    { date: "2024-06-25", assessments: 141, acuity: 190 },
    { date: "2024-06-26", assessments: 434, acuity: 380 },
    { date: "2024-06-27", assessments: 448, acuity: 490 },
    { date: "2024-06-28", assessments: 149, acuity: 200 },
    { date: "2024-06-29", assessments: 103, acuity: 160 },
    { date: "2024-06-30", assessments: 446, acuity: 400 },
]

const chartConfig = {
    views: {
        label: "Documents",
    },
    assessments: {
        label: "Assessments",
        color: "hsl(var(--chart-1))",
    },
    acuity: {
        label: "Acuity",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const BarChartInterActive = () => {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("assessments")

    const total = React.useMemo(
        () => ({
            assessments: chartData.reduce((acc, curr) => acc + curr.assessments, 0),
            acuity: chartData.reduce((acc, curr) => acc + curr.acuity, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>
                        Showing medical records for the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                    {["assessments", "acuity"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default React.memo(BarChartInterActive)