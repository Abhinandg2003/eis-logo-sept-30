import { cn } from "@/lib/utils";

// Add or remove logos here. Files go in /public/logos/
const logos = [
  { name: "Client 1", src: "/images/logos/1.png" },
  { name: "Client 2", src: "/images/logos/2.jpg" },
  { name: "Client 3", src: "/images/logos/3.jpg" },
  { name: "Client 4", src: "/images/logos/4.jpg" },
  { name: "Client 5", src: "/images/logos/5.jpg" },
  { name: "Client 6", src: "/images/logos/6.jpg" },
  { name: "Client 7", src: "/images/logos/7.jpg" },
  { name: "Client 8", src: "/images/logos/8.jpg" },
];

type LogoMarqueeProps = {
  speed?: number; // seconds for one full loop (higher = slower)
  className?: string;
};

export function LogoMarquee({ speed = 50, className }: LogoMarqueeProps) {
  return (
    <div
      className={cn("logo-marquee border-y border-black/5 py-3", className)}
      style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
    >
      <div className="logo-marquee__track">
        {/* The list is rendered twice so the loop has no gap */}
        {[0, 1, 2, 3].map((copy) =>
          logos.map((logo) => (
            <div
              key={`${copy}-${logo.name}`}
              className="logo-marquee__item"
              aria-hidden={copy === 1}
            >
              <img
                src={logo.src}
                alt={copy === 0 ? logo.name : ""}
                className="logo-marquee__img"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}