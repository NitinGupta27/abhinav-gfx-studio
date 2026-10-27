import { usePortfolio } from "@/store/portfolio";

export const Footer = () => {
  const { settings } = usePortfolio();
  const b = settings.brand.trim();
  const i = b.indexOf(" ");
  const [a, rest] = i > 0 ? [b.slice(0, i), b.slice(i + 1)] : [b, ""];
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-xs font-bold text-primary-foreground">{a.charAt(0)}</span>
          <span className="font-display font-bold">{a} <span className="text-gradient">{rest}</span></span>
        </div>
        <p className="text-sm text-muted-foreground">© 2026 {b}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
