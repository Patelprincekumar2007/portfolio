import { marqueeItems } from "@/lib/content";

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-paper/10 py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm uppercase tracking-widest text-paper/50">
            {item}
            <span className="text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
