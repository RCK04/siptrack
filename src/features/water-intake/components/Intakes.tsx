import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/shared/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/shared/components/ui/chart";
import { palette } from "@/shared/theme/palette";

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
      ? Math.max(0, Math.min((value / target) * 100, 100))
      : 0;

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
    <Card className="min-w-0 rounded-lg border-flow-line bg-white/60 py-0 text-flow-ink shadow-none">
      <CardContent className="flex items-center gap-4 p-5 xl:p-6">
        <ChartContainer
          config={config}
          aria-label={`${label}: ${Math.round(progress)}% of goal`}
          role="img"
          className="aspect-square size-20 shrink-0 [&_.recharts-radial-bar-background-sector]:fill-flow-surface"
        >
          <RadialBarChart
            data={progressData}
            startAngle={90}
            endAngle={-270}
            innerRadius={29}
            outerRadius={39}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
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
                      <tspan className="fill-flow-ink font-display text-base font-medium">
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
          <p className="text-[11px] text-flow-muted">{label}</p>

          <p className="mt-1 font-display text-[26px] leading-tight font-medium text-flow-ink tabular-nums">
            {value.toLocaleString("en-US")}
            <span className="ml-1 text-sm font-normal">{unit}</span>
          </p>

          <p className="mt-1 text-[11px] text-flow-muted">
            Goal:{" "}
            {target.toLocaleString("en-US", {
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
    <section aria-label="Hydration overview" className="grid gap-4 lg:grid-cols-3">
      <CardPercentage
        label="Daily Intake"
        value={chartData.dailyIntake}
        target={dailyTarget}
        unit="ml"
        color={palette.flow.ink}
      />

      <CardPercentage
        label="Average Intake"
        value={chartData.averageIntake}
        target={dailyTarget}
        unit="ml"
        color={palette.teal[700]}
      />

      <CardPercentage
        label="Total Intake"
        value={chartData.totalIntake}
        target={goal.targetIntake}
        unit="ml"
        color={palette.flow.chart}
      />
    </section>
  );
};
