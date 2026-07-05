import { useState } from "react";
import { login } from "@/lib/auth";
import { Sparkles, Lock, User } from "lucide-react";
import { toast } from "sonner";

export const AdminLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (login(username.trim(), password)) {
        toast.success("Welcome back, Abhinav");
        onSuccess();
      } else {
        toast.error("Invalid credentials");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/30 blur-3xl animate-glow-pulse" />

      <form onSubmit={submit} className="relative w-full max-w-md glass-strong rounded-3xl p-8 md:p-10 space-y-6 animate-fade-in-up">
        <div className="text-center space-y-3">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary glow-blue">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gradient">ABHINAV GFX</h1>
          <p className="text-sm text-muted-foreground">Creator CMS · Admin Access</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Username</span>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/60 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                placeholder="abhinav"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Password</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/60 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                placeholder="••••••••"
              />
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold glow-blue hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Authenticating…" : "Enter Dashboard"}
        </button>
        <p className="text-[11px] text-center text-muted-foreground">Protected area · Unauthorized access is prohibited</p>
      </form>
    </div>
  );
};
