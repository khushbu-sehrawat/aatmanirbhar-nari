import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ShieldCheck, Sparkles, Store, Users } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Aatmanirbhar Nari" }] }),
  component: Admin,
});

const growth = [
  { m: "Jan", users: 1200 }, { m: "Feb", users: 1800 }, { m: "Mar", users: 2600 },
  { m: "Apr", users: 3500 }, { m: "May", users: 4700 }, { m: "Jun", users: 6100 },
];
const cats = [
  { name: "Tiffin", v: 28 }, { name: "Beauty", v: 22 }, { name: "Tailoring", v: 18 },
  { name: "Baking", v: 14 }, { name: "Others", v: 18 },
];
const COLORS = ["oklch(0.55 0.22 305)", "oklch(0.70 0.18 350)", "oklch(0.78 0.15 50)", "oklch(0.65 0.15 280)", "oklch(0.85 0.04 320)"];

function Admin() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-extrabold leading-tight">Admin Console</div>
              <div className="text-xs text-muted-foreground">Aatmanirbhar Nari</div>
            </div>
          </Link>
          <Button asChild variant="outline" size="sm"><Link to="/">Exit</Link></Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          <StatCard icon={Users} label="Registered users" value="14,209" tone="primary" />
          <StatCard icon={Store} label="Businesses" value="5,148" tone="pink" />
          <StatCard icon={CheckCircle2} label="Pending approvals" value="62" tone="orange" />
          <StatCard icon={Sparkles} label="Active today" value="2,840" tone="primary" />
          <StatCard icon={AlertTriangle} label="Open complaints" value="9" tone="destructive" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-display text-base font-bold">User growth</h3>
            <p className="text-xs text-muted-foreground">Monthly registrations</p>
            <ResponsiveContainer width="100%" height={260} className="mt-4">
              <AreaChart data={growth}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-purple)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="users" stroke="var(--brand-purple)" strokeWidth={3} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-display text-base font-bold">Top categories</h3>
            <p className="text-xs text-muted-foreground">Share of listings</p>
            <ResponsiveContainer width="100%" height={260} className="mt-4">
              <PieChart>
                <Pie data={cats} dataKey="v" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {cats.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {cats.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground">{c.name}</span>
                  <span className="ml-auto font-semibold">{c.v}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold">Pending approvals</h3>
              <p className="text-xs text-muted-foreground">Review and approve new business profiles</p>
            </div>
            <Badge variant="secondary">62 pending</Badge>
          </div>
          <div className="divide-y divide-border">
            {[
              { name: "Sweet Layers", owner: "Riya Bansal", cat: "Baking", city: "Delhi" },
              { name: "Mind & Math", owner: "Kavita Rao", cat: "Tuition", city: "Hyderabad" },
              { name: "Pickle Paradise", owner: "Lata Singh", cat: "Pickles", city: "Bhopal" },
              { name: "Wax & Wick", owner: "Tara Bose", cat: "Candle making", city: "Kolkata" },
            ].map((b, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 sm:flex">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary font-bold text-secondary-foreground">
                  {b.name[0]}
                </div>
                <div className="min-w-0 sm:flex-1">
                  <div className="truncate font-semibold">{b.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{b.owner} · {b.cat} · {b.city}</div>
                </div>
                <div className="col-span-2 flex gap-2 sm:col-span-1">
                  <Button size="sm" variant="outline">Reject</Button>
                  <Button size="sm" className="bg-gradient-primary text-white">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, tone,
}: { icon: typeof Users; label: string; value: string; tone: "primary" | "pink" | "orange" | "destructive" }) {
  const bg =
    tone === "primary" ? "bg-secondary text-secondary-foreground"
    : tone === "pink" ? "bg-accent text-accent-foreground"
    : tone === "orange" ? "bg-amber-100 text-amber-700"
    : "bg-red-100 text-red-700";
  return (
    <Card className="p-4">
      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${bg}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-extrabold">{value}</div>
    </Card>
  );
}
