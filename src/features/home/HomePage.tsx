import { Link } from "@tanstack/react-router";

import { NavigationMenu } from "./components/NavigationMenu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import Header from "@/shared/components/layouts/Header";

const HomePage = () => {
  return (
    <>
      <Header>
        <NavigationMenu />
      </Header>
      
      <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-10 px-6 py-8">
        <section className="grid flex-1 items-center gap-8 py-8 md:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-slide-up max-w-xl">
            <Badge className="mb-5">Hydration Flow</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Track your hydration without complicating your day.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Set your daily goal, log each drink, and follow your progress with
              a light, clear, and natural interface.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/sign-up/$">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/sign-in/$">I already have an account</Link>
              </Button>
            </div>
          </div>

          <Card
            className="animate-slide-up border-water-100 bg-white/90"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader>
              <CardTitle className="text-2xl">Today&apos;s goal</CardTitle>
              <CardDescription>
                A preview of the dashboard experience in Siptrack.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-water-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-3xl font-bold text-primary">
                    1.4L
                  </span>
                  <Badge variant="success">70%</Badge>
                </div>
                <Progress value={70} max={100} className="h-3 bg-white" />
                <p className="mt-4 text-sm text-muted-foreground">
                  600ml left to reach your daily goal.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default HomePage;
