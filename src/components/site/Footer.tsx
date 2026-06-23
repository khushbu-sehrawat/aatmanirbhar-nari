import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Sparkles, Twitter } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "Platform",
      links: [
        { to: "/explore", label: "Explore businesses" },
        { to: "/dashboard", label: "Entrepreneur dashboard" },
        { to: "/admin", label: "Admin" },
      ],
    },
    {
      title: "Company",
      links: [
        { to: "/", label: "About" },
        { to: "/", label: "Contact" },
        { to: "/", label: "Careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { to: "/", label: "Privacy policy" },
        { to: "/", label: "Terms of service" },
        { to: "/", label: "Cookies" },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-extrabold">Aatmanirbhar Nari</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            India's home for women entrepreneurs — list your home business, find local services
            you can trust, and grow together.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-card text-muted-foreground shadow-soft transition-colors hover:bg-gradient-primary hover:text-white"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{c.title}</h4>
            <ul className="mt-4 space-y-2">
              {c.links.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-foreground/80 hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Aatmanirbhar Nari · Built with love for women entrepreneurs across India.
      </div>
    </footer>
  );
}
