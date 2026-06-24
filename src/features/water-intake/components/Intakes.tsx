import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/shared/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";

const goal = {
  targetIntake: 25000,
  startDate: new Date("2026-12-01"),
  endDate: new Date("2026-12-13"),
};

const chartData = {
  dailyIntake: 1900,
  averageIntake: 1800,
  totalIntake: 17000,
};

const totalDays =
  Math.ceil(
    (goal.endDate.getTime() - goal.startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  ) + 1;

const dailyTarget = goal.targetIntake / totalDays;

type CardPercentageProps = {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
};

const CardPercentage = ({
  label,
  value,
  target,
  unit,
  color,
}: CardPercentageProps) => {
  const progress =
    target > 0
      ? Math.min((value / target) * 100, 100)
      : 0;

  const endAngle = (progress / 100) * 360;

  const progressData = [
    {
      name: "progress",
      value: progress,
      fill: color,
    },
  ];

  const config = {
    progress: {
      label,
      color,
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <ChartContainer
          config={config}
          className="size-24 shrink-0 aspect-square"
        >
          <RadialBarChart
            data={progressData}
            startAngle={90}
            endAngle={90 - endAngle}
            innerRadius={32}
            outerRadius={44}
          >
            <RadialBar
              dataKey="value"
              background
              cornerRadius={8}
              fill={color}
            />

            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return null;
                  }

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-foreground text-lg font-bold">
                        {Math.round(progress)}%
                      </tspan>
                    </text>
                  );
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="font-display text-2xl font-bold text-foreground">
            {value.toLocaleString("pt-BR")}
            <span className="ml-1 text-lg">{unit}</span>
          </p>

          <p className="text-xs text-muted-foreground mt-0.5">
            Goal:{" "}
            {target.toLocaleString("pt-BR", {
              maximumFractionDigits: 0,
            })}{" "}
            {unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const Intakes = () => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <CardPercentage
        label="Daily Intake"
        value={chartData.dailyIntake}
        target={dailyTarget}
        unit="ml"
        color="#0ea5e9"
      />

      <CardPercentage
        label="Average Intake"
        value={chartData.averageIntake}
        target={dailyTarget}
        unit="ml"
        color="#14b8a6"
      />

      <CardPercentage
        label="Total Intake"
        value={chartData.totalIntake}
        target={goal.targetIntake}
        unit="ml"
        color="#22c55e"
      />
    </section>
  );
};