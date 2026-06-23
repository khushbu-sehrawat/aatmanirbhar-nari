import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore — Aatmanirbhar Nari" }] }),
  component: Explore,
});

const cats = ["All", "Tiffin", "Tailoring", "Beauty", "Handicrafts", "Baking", "Tuition", "Boutique"];

const businesses = Array.from({ length: 12 }).map((_, i) => {
  const data = [
    { name: "Priya's Tiffin", owner: "Priya Sharma", cat: "Tiffin", city: "Pune", price: "₹80–150", rating: 4.9 },
    { name: "Stitch & Soul", owner: "Anjali Verma", cat: "Tailoring", city: "Jaipur", price: "₹200–1200", rating: 4.8 },
    { name: "Glow Studio", owner: "Meera Iyer", cat: "Beauty", city: "Bengaluru", price: "₹300–2500", rating: 5.0 },
    { name: "Hasthkala Crafts", owner: "Sunita Devi", cat: "Handicrafts", city: "Lucknow", price: "₹150–1800", rating: 4.7 },
    { name: "Sweet Layers", owner: "Riya Bansal", cat: "Baking", city: "Delhi", price: "₹400–3500", rating: 4.8 },
    { name: "Mind & Math", owner: "Kavita Rao", cat: "Tuition", city: "Hyderabad", price: "₹2000/mo", rating: 4.9 },
  ];
  const d = data[i % data.length];
  return { ...d, id: i + 1 };
});

function Explore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const list = useMemo(
    () =>
      businesses.filter(
        (b) =>
          (cat === "All" || b.cat === cat) &&
          (q === "" ||
            b.name.toLowerCase().includes(q.toLowerCase()) ||
            b.city.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat],
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Discover <span className="text-gradient-primary">women-led</span> home businesses
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Trusted local services across India — handpicked and reviewed by our community.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or city…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-12 rounded-xl bg-white/80 pl-10 backdrop-blur"
              />
            </div>
            <Button className="h-12 bg-gradient-primary text-white">Search</Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c
                    ? "bg-gradient-primary text-white shadow-soft"
                    : "bg-white/70 text-foreground hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 text-sm text-muted-foreground">{list.length} businesses found</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <Card key={b.id} className="hover-lift overflow-hidden">
              <div className="h-32 bg-gradient-primary" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-bold">{b.name}</h3>
                    <p className="text-sm text-muted-foreground">by {b.owner}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">{b.cat}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {b.city}</span>
                  <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {b.rating}</span>
                  <span className="font-semibold text-foreground">{b.price}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-gradient-primary text-white">
                    <Link to="/">View profile</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">Quick contact</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
