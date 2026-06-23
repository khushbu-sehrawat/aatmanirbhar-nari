import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Aatmanirbhar Nari" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-10 lg:grid-cols-2 lg:gap-12">
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-extrabold">Aatmanirbhar Nari</span>
          </Link>
          <h1 className="mt-10 font-display text-4xl font-extrabold leading-tight">
            Welcome back to your <span className="text-gradient-primary">home business hub</span>.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Sign in to manage your listings, inquiries and growth tools.
          </p>
        </div>

        <Card className="glass-card mx-auto w-full max-w-md p-8 shadow-elegant">
          <h2 className="font-display text-2xl font-extrabold">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back — let's keep growing.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email or phone</Label>
              <Input id="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-gradient-primary text-white">Sign in</Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR CONTINUE WITH <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Google</Button>
            <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link to="/signup" className="font-semibold text-primary hover:underline">Create an account</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
