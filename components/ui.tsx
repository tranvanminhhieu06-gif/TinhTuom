import type { ReactNode } from "react";

/* Nút hành động chính.
   Nghỉ: nền #E31837 + chữ trắng = 4.72:1 ✓
   Rê chuột: nền #C4142F + chữ trắng = 6.02:1 ✓ (đậm lên chứ không nhạt đi,
   nếu không thì nút lại rớt chuẩn đúng lúc người ta chạm vào).
   min-h 48px ≥ mục tiêu chạm 44×44. */
const ctaBase =
  "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-red-brand px-7 text-[15px] font-bold uppercase tracking-wide text-on-red shadow-[0_6px_20px_-8px_rgba(227,24,55,0.75)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-red-strong hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 cursor-pointer";

export function CtaLink({
  children,
  className = "",
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a className={`${ctaBase} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function CtaButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${ctaBase} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-orange-text">
          <span aria-hidden className="h-px w-8 bg-orange-brand" />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance font-display text-[28px] font-extrabold leading-[1.18] text-ink sm:text-[36px] lg:text-[42px]">
        {title}
      </h2>
      {lead ? <p className="text-pretty text-[17px] text-ink-56">{lead}</p> : null}
    </div>
  );
}

/** Con dấu Tinh Tươm dựng bằng SVG — thay bằng file logo gốc khi có. */
export function Logo({
  size = 36,
  showWordmark = true,
  tone = "ink",
}: {
  size?: number;
  showWordmark?: boolean;
  tone?: "ink" | "paper";
}) {
  const wordColor = tone === "paper" ? "text-paper" : "text-ink";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="Tinh Tươm"
        className="shrink-0"
      >
        <path d="M24 2 46 24 24 46 2 24Z" fill="var(--c-red)" />
        <path
          d="M24 8 40 24 24 40 8 24Z"
          fill="none"
          stroke="var(--c-on-red)"
          strokeWidth="1.6"
          opacity="0.55"
        />
        <text
          x="24"
          y="24"
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--c-on-red)"
          fontSize="15"
          fontWeight="800"
          fontFamily="var(--font-display), sans-serif"
          letterSpacing="0.5"
        >
          TT
        </text>
      </svg>
      {showWordmark ? (
        <span
          className={`font-display text-[17px] font-extrabold leading-none tracking-tight ${wordColor}`}
        >
          Tinh Tươm
        </span>
      ) : null}
    </span>
  );
}
