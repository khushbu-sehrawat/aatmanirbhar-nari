import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Award, BookOpen, Brush, Cake, ChefHat, CheckCircle2, Cookie, Flower2,
  GraduationCap, Heart, Home, Landmark, Palette, Scissors, ShoppingBag, Sparkles, Star,
  Sprout, UserPlus, Users, Wand2,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aatmanirbhar Nari — Empowering Women, Growing Home Businesses" },
      { name: "description", content: "List your home business or find trusted women-led local services — tiffin, tailoring, beauty, handicrafts and more." },
      { property: "og:title", content: "Aatmanirbhar Nari" },
      { property: "og:description", content: "Empowering Women. Growing Home Businesses." },
    ],
  }),
  component: Landing,
});

function useCountUp(target: number, durationMs = 1500, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, durationMs]);
  return value;
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const a = useCountUp(10000, 1600, visible);
  const b = useCountUp(5000, 1600, visible);
  const c = useCountUp(50, 1400, visible);
  const stats = [
    { v: a, suffix: "+", label: "Women empowered" },
    { v: b, suffix: "+", label: "Businesses listed" },
    { v: c, suffix: "+", label: "Cities covered" },
  ];
  return (
    <div ref={ref} className="grid grid-cols-3 gap-3 sm:gap-6">
      {stats.map((s) => (
        <div key={s.label} className="glass-card rounded-2xl px-3 py-4 text-center shadow-soft sm:px-6 sm:py-5">
          <div className="font-display text-2xl font-extrabold text-gradient-primary sm:text-4xl">
            {s.v.toLocaleString()}{s.suffix}
          </div>
          <div className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-sm">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

const categories = [
  { name: "Tiffin Services", icon: ChefHat, hue: "from-orange-200 to-pink-200" },
  { name: "Tailoring", icon: Scissors, hue: "from-purple-200 to-pink-200" },
  { name: "Beauty Services", icon: Sparkles, hue: "from-pink-200 to-rose-200" },
  { name: "Handicrafts", icon: Palette, hue: "from-amber-200 to-orange-200" },
  { name: "Baking", icon: Cake, hue: "from-rose-200 to-orange-200" },
  { name: "Home Decor", icon: Home, hue: "from-purple-200 to-indigo-200" },
  { name: "Mehendi Artist", icon: Brush, hue: "from-orange-200 to-amber-200" },
  { name: "Tuition Classes", icon: GraduationCap, hue: "from-indigo-200 to-purple-200" },
  { name: "Yoga Trainer", icon: Flower2, hue: "from-emerald-200 to-teal-200" },
  { name: "Boutique", icon: ShoppingBag, hue: "from-pink-200 to-fuchsia-200" },
  { name: "Homemade Pickles", icon: Cookie, hue: "from-amber-200 to-rose-200" },
  { name: "Candle Making", icon: Wand2, hue: "from-fuchsia-200 to-purple-200" },
  { name: "Jewelry", icon: Star, hue: "from-yellow-200 to-amber-200" },
  { name: "Crochet", icon: Heart, hue: "from-rose-200 to-pink-200" },
  { name: "Organic Products", icon: Sprout, hue: "from-emerald-200 to-lime-200" },
];

const steps = [
  { icon: UserPlus, title: "Register", desc: "Create your free account in under 60 seconds." },
  { icon: Sparkles, title: "Create profile", desc: "Add your story, services, photos and pricing." },
  { icon: CheckCircle2, title: "Get approved", desc: "Quick review by our team to build customer trust." },
  { icon: Users, title: "Receive customers", desc: "Get inquiries and grow your home business." },
];

const stories = [
  { name: "Priya Sharma", biz: "Priya's Tiffin", city: "Pune", growth: "+38%", rating: 4.9 },
  { name: "Anjali Verma", biz: "Stitch & Soul", city: "Jaipur", growth: "+52%", rating: 4.8 },
  { name: "Meera Iyer", biz: "Glow Beauty Studio", city: "Bengaluru", growth: "+27%", rating: 5.0 },
  { name: "Sunita Devi", biz: "Hasthkala Crafts", city: "Lucknow", growth: "+44%", rating: 4.7 },
];

const schemes = [
  { name: "Mudra Loan", desc: "Collateral-free loans up to ₹10 lakh for micro businesses.", icon: Landmark },
  { name: "Stand-Up India", desc: "₹10 lakh – ₹1 cr loans for women & SC/ST entrepreneurs.", icon: Award },
  { name: "Skill India", desc: "Free training and certification across 400+ skills.", icon: BookOpen },
  { name: "PMEGP", desc: "Subsidy up to 35% for new micro enterprises.", icon: Sparkles },
];

const testimonials = [
  { name: "Riya M.", role: "Customer · Delhi", text: "Found the best home tiffin in my area. Tastes like home, and I love supporting women-run businesses." },
  { name: "Kavita S.", role: "Entrepreneur · Indore", text: "I went from 0 to 80 orders a month. The dashboard makes everything simple." },
  { name: "Neha T.", role: "Customer · Mumbai", text: "The mehendi artist I booked was amazing. Aatmanirbhar Nari is my go-to now." },
];

const faqs = [
  { q: "Is it free to list my home business?", a: "Yes — creating a profile and listing your services is completely free." },
  { q: "How do customers contact me?", a: "Through inquiries and quick-contact buttons. You stay in control of every conversation." },
  { q: "Do you support multiple languages?", a: "We're rolling out Hindi and English first, with more Indian languages coming soon." },
  { q: "How long does approval take?", a: "Most profiles are reviewed within 24 hours." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors />
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-brand-orange/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="animate-fade-in-up">
            <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary">
              <Heart className="mr-1 h-3 w-3" /> Made for Indian women entrepreneurs
            </Badge>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Empowering Women.{" "}
              <span className="text-gradient-primary">Growing Home Businesses.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              List your home business, reach local customers, and grow with tools, learning and
              government scheme support — all in one warm, trustworthy place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-primary text-white shadow-elegant hover:opacity-95">
                <Link to="/signup">
                  Start your business <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border bg-white/60 backdrop-blur">
                <Link to="/explore">Explore local services</Link>
              </Button>
            </div>
            <div className="mt-10">
              <StatsBar />
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
            <img
              src={hero}
              alt="Women entrepreneurs running home businesses"
              width={1536}
              height={1024}
              className="relative w-full rounded-[2rem] object-cover shadow-elegant"
            />
            <div className="absolute -bottom-6 left-6 hidden gap-3 rounded-2xl bg-card px-4 py-3 shadow-elegant sm:flex">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-white">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Rated 4.9 / 5</div>
                <div className="text-xs text-muted-foreground">by 8,400+ users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Categories"
          title="Find or list a business you love"
          sub="From tiffin to tailoring — a vibrant marketplace of women-led services."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Card
              key={c.name}
              className="hover-lift group cursor-pointer overflow-hidden border-border/60 p-5 text-center"
            >
              <div className={`mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.hue} text-primary`}>
                <c.icon className="h-7 w-7" />
              </div>
              <div className="text-sm font-semibold">{c.name}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore <ArrowRight className="h-3 w-3" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How it works" title="Go live in four simple steps" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Card key={s.title} className="hover-lift relative overflow-hidden p-6">
                <div className="absolute right-4 top-4 font-display text-5xl font-extrabold text-secondary">
                  0{i + 1}
                </div>
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-white">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Success stories" title="Women who are leading the way" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((s) => (
            <Card key={s.name} className="hover-lift overflow-hidden">
              <div className="h-32 bg-gradient-primary" />
              <div className="-mt-10 px-5 pb-5">
                <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-card bg-secondary font-display text-2xl font-extrabold text-secondary-foreground shadow-soft">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="mt-4">
                  <h4 className="font-display text-base font-bold">{s.name}</h4>
                  <p className="text-sm text-muted-foreground">{s.biz} · {s.city}</p>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2 text-xs">
                  <span className="font-semibold text-primary">{s.growth} monthly</span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {s.rating}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SCHEMES */}
      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Government schemes"
            title="Funding & support you may qualify for"
            sub="Curated schemes that help women launch and grow their businesses."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {schemes.map((s) => (
              <Card key={s.name} className="hover-lift p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h4 className="font-display text-base font-bold">{s.name}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Learn more <ArrowRight className="h-3 w-3" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="Loved by customers and entrepreneurs" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6">
              <div className="mb-3 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
              </div>
              <p className="text-sm text-foreground/90">"{t.text}"</p>
              <div className="mt-4 border-t border-border pt-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ + NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:grid lg:grid-cols-5 lg:gap-12 lg:px-8">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="left" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          <Card className="overflow-hidden border-none bg-gradient-primary p-8 text-white shadow-elegant">
            <Sparkles className="h-7 w-7" />
            <h3 className="mt-4 font-display text-2xl font-extrabold">Get growth tips weekly</h3>
            <p className="mt-2 text-sm text-white/90">
              Stories, schemes, marketing tips — straight to your inbox. No spam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("You're subscribed! 💜");
                (e.target as HTMLFormElement).reset();
              }}
              className="mt-6 flex flex-col gap-2 sm:flex-row"
            >
              <Input
                required
                type="email"
                placeholder="your@email.com"
                className="border-white/30 bg-white/15 text-white placeholder:text-white/70"
              />
              <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeading({
  eyebrow, title, sub, align = "center",
}: { eyebrow: string; title: string; sub?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
