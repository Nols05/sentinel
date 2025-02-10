"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data representing weekly sentiment distributions
const sentimentData = [
  { week: "Semana 1", negative: 30, neutral: 45, positive: 25 },
  { week: "Semana 2", negative: 25, neutral: 50, positive: 25 },
  { week: "Semana 3", negative: 20, neutral: 45, positive: 35 },
  { week: "Semana 4", negative: 15, neutral: 40, positive: 45 },
  { week: "Semana 5", negative: 10, neutral: 35, positive: 55 },
  { week: "Semana 6", negative: 15, neutral: 30, positive: 55 },
  { week: "Semana 7", negative: 20, neutral: 35, positive: 45 },
  { week: "Semana 8", negative: 18, neutral: 37, positive: 45 },
]

export default function SentimentTrendChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Distribución del sentimiento</CardTitle>
        <CardDescription>Evolución semanal del sentimiento general</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            negative: {
              label: "Negativo",
              color: "hsl(var(--chart-1))",
            },
            neutral: {
              label: "Neutral",
              color: "hsl(var(--chart-2))",
            },
            positive: {
              label: "Positivo",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%" className="-ml-9">
            <LineChart data={sentimentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="negative" stroke="var(--color-negative)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="neutral" stroke="var(--color-neutral)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="positive" stroke="var(--color-positive)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card >

  )
}

