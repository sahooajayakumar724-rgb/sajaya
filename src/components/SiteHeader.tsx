import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  const cls = "rounded-full px-4 py-2 text-sm font-medium";
  return (
    <header className="bg-hero text-primary-foreground">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-display text-lg font-bold">StudySpark India</Link>
        <nav className="flex gap-2">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "bg-primary-foreground/25" }} className={cls}>Home</Link>
          <Link to="/notes" activeProps={{ className: "bg-primary-foreground/25" }} className={`${cls} bg-primary-foreground/15`}>Notes</Link>
        </nav>
      </div>
    </header>
  );
}
