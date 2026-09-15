"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowDown } from "lucide-react";
import Reveal from "./Reveal";
import { CtaLink, Logo } from "./ui";

const NAV = [
  { href: "#gia-tri", label: "Giá trị" },
  { href: "#chan-dung", label: "Chân dung" },
  { href: "#lo-trinh", label: "Lộ trình" },
];

const PARTNERS = [
  { name: "Guru.edu.vn", initials: "GR" },
  { name: "Meraki", initials: "MK" },
  { name: "Tinh Tươm", initials: "TT" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-line bg-[rgba(254,254,254,0.93)] backdrop-blur-md"
          : "border-b border-transparent bg-[rgba(254,254,254,0.75)] backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-wrap items-center justify-between px-5 lg:px-8">
        <a href="#top" className="rounded-lg" aria-label="Tinh Tươm — về đầu trang">
          <Logo size={40} />
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-lg px-4 py-2.5 text-[15px] font-semibold text-ink-72 transition-colors duration-200 hover:text-red-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaLink href="#dang-ky" className="hidden px-5 text-sm sm:inline-flex">
            Đăng ký ngay
          </CtaLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-mist md:hidden cursor-pointer"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <nav aria-label="Điều hướng chính (di động)" className="px-5 py-3">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[48px] items-center border-b border-line text-[16px] font-semibold text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <CtaLink
                    href="#dang-ky"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Đăng ký ngay
                  </CtaLink>
                </li>
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <>
      <Header />

      <section
        id="top"
        className="relative overflow-hidden bg-mist pb-16 pt-[120px] sm:pb-20 lg:pb-28 lg:pt-[160px]"
      >
        {/* Nền trang trí — thuần trang trí nên aria-hidden */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(243,146,0,0.16),transparent_62%)]" />
          <div className="absolute -bottom-32 -left-28 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.14),transparent_62%)]" />
        </div>

        <div className="relative mx-auto max-w-wrap px-5 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(243,146,0,0.45)] bg-paper px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-orange-text">
                <span aria-hidden className="h-2 w-2 rounded-full bg-orange-brand" />
                NextGen Elite · Tinh hoa tự chủ
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-balance font-display text-[32px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-ink sm:text-[46px] lg:text-[58px]">
                Bạn không cần phải hoàn hảo để bắt đầu,{" "}
                <span className="text-red-brand">nhưng</span>
                <br className="hidden sm:block" />{" "}
                bạn cần bắt đầu để trở nên tinh hoa!
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-[19px] font-semibold text-ink sm:text-[21px]">
                Đừng để 4 năm Đại học trôi qua trong sự{" "}
                <mark className="bg-[linear-gradient(transparent_62%,rgba(243,146,0,0.42)_62%)] px-0.5 font-extrabold text-ink">
                  THỤ ĐỘNG
                </mark>
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-ink-72">
                Hệ sinh thái bứt phá tiềm năng và trải nghiệm thực chiến: Đào tạo tư
                duy tự chủ, trang bị bộ kỹ năng đa nhiệm và cam kết cơ hội thực tập
                chất lượng cao.
              </p>
            </Reveal>
          </div>

          {/* Bằng chứng xã hội đứng TRƯỚC nút — người ta cần lý do rồi mới bấm */}
          <Reveal delay={0.24}>
            <div className="mt-10 rounded-card border border-line bg-paper p-5 sm:p-6 lg:mt-12">
              <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-ink-56">
                Đừng bỏ lỡ cơ hội tiếp cận:
              </p>

              <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap items-center gap-3">
                  {PARTNERS.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-center gap-2.5 rounded-xl border border-line bg-mist px-3.5 py-2.5"
                    >
                      {/* Thay khối này bằng <Image src="/logos/..." /> khi có file gốc */}
                      <span
                        aria-hidden
                        className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-[12px] font-extrabold text-paper"
                      >
                        {p.initials}
                      </span>
                      <span className="text-[14px] font-bold text-ink">{p.name}</span>
                    </li>
                  ))}
                  <li className="text-[14px] font-semibold text-green-text">
                    + 1000 doanh nghiệp uy tín
                  </li>
                </ul>

                <CtaLink href="#dang-ky" className="w-full sm:w-auto">
                  Đăng ký ngay
                </CtaLink>
              </div>
            </div>
          </Reveal>

          {!reduce ? (
            <motion.p
              aria-hidden
              className="mt-10 hidden items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink-56 lg:flex"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={16} /> Cuộn để xem
            </motion.p>
          ) : null}
        </div>
      </section>
    </>
  );
}
