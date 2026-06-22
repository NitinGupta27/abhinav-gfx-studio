import { useState } from "react";
import { Mail, Youtube, MessageCircle, Send } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message required").max(1000),
});

const channels = [
  { icon: Mail, label: "Email", value: "heyabhinavgupta@gmail.com", href: "mailto:heyabhinavgupta@gmail.com" },
  { icon: Youtube, label: "YouTube", value: "@abhinavgupta_yt", href: "https://youtube.com/@abhinavgupta_yt?si=pEQ_ZLwcUb85grE1" },
  { icon: MessageCircle, label: "Discord", value: "abhinavnitingupta", href: "#" },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) return toast.error(r.error.issues[0].message);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 700);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeading eyebrow="Get In Touch" title="Let's Create Something Amazing" description="Have a project in mind or just want to say hi? Drop a message — I usually reply within a day." />
        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-3">
            {channels.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 glass rounded-2xl p-5 hover:border-primary/40 transition-all hover:-translate-y-0.5">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <c.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="font-medium truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
          <form onSubmit={onSubmit} className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition" placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition" placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} rows={5} className="w-full bg-input/60 border border-border rounded-xl px-4 py-3 outline-none focus:border-primary transition resize-none" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-6 py-3.5 font-medium text-primary-foreground glow-blue hover:scale-[1.02] transition-transform disabled:opacity-60">
              {loading ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
