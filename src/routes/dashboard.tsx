import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3, Bell, Eye, Image as ImageIcon, Inbox, LayoutDashboard, MessageSquare,
  Package, Settings as SettingsIcon, Sparkles, Star, TrendingUp, Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Aatmanirbhar Nari" }] }),
  component: Dashboard,
});

const visitors = [
  { m: "Jan", v: 420 }, { m: "Feb", v: 510 }, { m: "Mar", v: 690 },
  { m: "Apr", v: 760 }, { m: "May", v: 920 }, { m: "Jun", v: 1080 },
];
const inquiries = [
  { m: "Jan", v: 18 }, { m: "Feb", v: 24 }, { m: "Mar", v: 32 },
  { m: "Apr", v: 41 }, { m: "May", v: 56 }, { m: "Jun", v: 73 },
];

const nav = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Sparkles, label: "Business profile" },
  { icon: Package, label: "Services" },
  { icon: ImageIcon, label: "Gallery" },
  { icon: Inbox, label: "Inquiries" },
  { icon: MessageSquare, label: "Orders" },
  { icon: BarChart3, label: "Analytics" },
  { icon: SettingsIcon, label: "Settings" },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-sidebar p-4 lg:block">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-display font-extrabold">Aatmanirbhar</span>
        </Link>
        <nav className="mt-6 space-y-1">
          {nav.map((n) => (
            <button
              key={n.label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                n.active
                  ? "bg-gradient-primary text-white shadow-soft"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <Card className="mt-8 border-none bg-gradient-primary p-4 text-white">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-80">Profile</div>
          <div className="mt-1 text-sm">Complete your profile to attract more customers.</div>
          <Progress value={72} className="mt-3 bg-white/20 [&>*]:bg-white" />
          <div className="mt-2 text-xs">72% complete</div>
        </Card>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <h1 className="font-display text-xl font-extrabold sm:text-2xl">Welcome back, Priya 👋</h1>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">Here's how your business is performing today.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary font-bold text-white">P</div>
          </div>
        </header>

        <div className="space-y-8 p-4 sm:p-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            <StatCard icon={Eye} label="Total views" value="12,480" delta="+18%" />
            <StatCard icon={Inbox} label="Inquiries" value="248" delta="+24%" />
            <StatCard icon={Package} label="Active listings" value="14" delta="+2" />
            <StatCard icon={MessageSquare} label="Orders" value="89" delta="+11%" />
            <StatCard icon={Star} label="Rating" value="4.9" delta="+0.2" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold">Monthly visitors</h3>
                  <p className="text-xs text-muted-foreground">Last 6 months</p>
                </div>
                <Badge variant="secondary"><TrendingUp className="mr-1 h-3 w-3" /> Growing</Badge>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={visitors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Line type="monotone" dataKey="v" stroke="var(--brand-purple)" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <div className="mb-4">
                <h3 className="font-display text-base font-bold">Inquiry trend</h3>
                <p className="text-xs text-muted-foreground">Last 6 months</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={inquiries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                  <Bar dataKey="v" fill="var(--brand-pink)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold">Recent inquiries</h3>
                <p className="text-xs text-muted-foreground">Respond quickly to win more customers</p>
              </div>
              <Button size="sm" variant="outline">View all</Button>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "Anita R.", msg: "Need vegetarian tiffin for 2 weeks, North Indian.", svc: "Veg Tiffin", time: "5m ago", status: "New" },
                { name: "Rahul M.", msg: "Birthday cake for Saturday, eggless 1kg chocolate.", svc: "Baking", time: "1h ago", status: "Replied" },
                { name: "Sneha K.", msg: "Mehendi for bride + 6 guests on 12th.", svc: "Mehendi", time: "3h ago", status: "New" },
              ].map((i, k) => (
                <div key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 sm:flex sm:items-center">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-bold text-secondary-foreground">
                    {i.name[0]}
                  </div>
                  <div className="min-w-0 sm:flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">{i.name}</span>
                      <Badge variant={i.status === "New" ? "default" : "secondary"} className={i.status === "New" ? "bg-gradient-primary text-white" : ""}>
                        {i.status}
                      </Badge>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{i.msg}</p>
                  </div>
                  <div className="hidden text-right text-xs text-muted-foreground sm:block">
                    <div>{i.svc}</div>
                    <div>{i.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, delta }: { icon: typeof Eye; label: string; value: string; delta: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs text-muted-foreground">{label}</div>
          <div className="font-display text-xl font-extrabold">{value}</div>
        </div>
      </div>
      <div className="mt-2 text-xs font-semibold text-primary">{delta}</div>
    </Card>
  );
}
