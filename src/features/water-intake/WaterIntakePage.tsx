import { UserButton, Show } from "@clerk/react";
import { Navigate } from "@tanstack/react-router";
import { DropletIcon, UserRound } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import Header from "@/shared/components/layouts/Header";

export function WaterIntakePage() {
  const intakeItems = [
    { volume: 500, time: "09:30" },
    { volume: 250, time: "11:10" },
    { volume: 650, time: "14:45" },
  ];

  return (
    <>
      <Show when="signed-out">
        <Navigate to="/sign-in/$" search={{ redirect_url: "/app" }} />
      </Show>

      <Show when="signed-in">
        <Header section="Dashboard">
          <UserButton />
        </Header>
        
        <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 px-6 py-8">
          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <DropletIcon className="size-6 text-primary" />
                  <span className="text-sm font-semibold text-mint-600">+</span>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">Consumed today</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  1.4<span className="ml-1 text-lg">L</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="size-6 rounded-full bg-water-100" />
                  <span className="text-sm font-semibold text-muted-foreground">=</span>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">Daily goal</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  2.0<span className="ml-1 text-lg">L</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="size-6 rounded-full bg-mint-100" />
                  <span className="text-sm font-semibold text-mint-600">+</span>
                </div>
                <p className="mb-1 text-sm text-muted-foreground">Streak</p>
                <p className="font-display text-2xl font-bold text-foreground">
                  4<span className="ml-1 text-lg">days</span>
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle>Daily log</CardTitle>
                    <CardDescription>Track the progress toward your hydration goal.</CardDescription>
                  </div>
                  <Badge variant="success">70%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-foreground">Progress</span>
                    <span className="text-sm text-muted-foreground">70%</span>
                  </div>
                  <Progress value={1400} max={2000} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Button>+250ml</Button>
                  <Button variant="secondary">+500ml</Button>
                  <Button variant="outline">Custom</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest entries</CardTitle>
                <CardDescription>Sample data to validate the layout.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {intakeItems.map(item => (
                  <div
                    key={`${item.volume}-${item.time}`}
                    className="flex items-center justify-between rounded-lg border border-water-100 bg-water-50 p-4 transition-colors hover:bg-water-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <DropletIcon className="size-5" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-foreground">{item.volume} ml</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
      </Show>
    </>
  );
}
