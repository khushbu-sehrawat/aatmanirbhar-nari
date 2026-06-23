import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Mail, Sparkles, Store, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Aatmanirbhar Nari" }] }),
  component: SignupPage,
});

function SignupPage() {
  const [role, setRole] = useState<"entrepreneur" | "customer">("entrepreneur");
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-extrabold">Aatmanirbhar Nari</span>
        </Link>

        <Card className="glass-card mt-8 p-8 shadow-elegant">
          <h2 className="font-display text-2xl font-extrabold">Create your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Join thousands of women building home businesses.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {([
              { id: "entrepreneur", label: "Entrepreneur", icon: Store, desc: "List a home business" },
              { id: "customer", label: "Customer", icon: User, desc: "Discover local services" },
            ] as const).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  role === r.id
                    ? "border-primary bg-secondary/40 shadow-soft"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <r.icon className="h-5 w-5 text-primary" />
                <div className="mt-2 font-semibold">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.desc}</div>
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = role === "entrepreneur" ? "/dashboard" : "/explore";
            }}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <Field id="name" label="Full name" placeholder="Your name" />
            <Field id="phone" label="Phone" placeholder="+91 9876543210" />
            <Field id="email" label="Email" type="email" placeholder="you@example.com" />
            <Field id="loc" label="Location" placeholder="City, State" />
            <div className="sm:col-span-2">
              <Field id="pw" label="Password" type="password" placeholder="Create a password" />
            </div>
            <Button type="submit" className="bg-gradient-primary text-white sm:col-span-2">
              Create account
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Google</Button>
            <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

function Field({ id, label, ...rest }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} required {...rest} />
    </div>
  );
}
