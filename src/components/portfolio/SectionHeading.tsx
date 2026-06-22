interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}
export const SectionHeading = ({ eyebrow, title, description }: Props) => (
  <div className="max-w-2xl mx-auto text-center mb-14 md:mb-20">
    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-5">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
      {eyebrow}
    </div>
    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
      {title.split(" ").map((w, i) =>
        i === title.split(" ").length - 1 ? (
          <span key={i} className="text-gradient">{w}</span>
        ) : (
          <span key={i}>{w} </span>
        )
      )}
    </h2>
    {description && <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>}
  </div>
);
