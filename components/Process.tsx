"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Users, MessageSquare, Rocket, type LucideIcon } from "lucide-react";
import Reveal, { RevealGroup, fadeUp } from "./Reveal";
import { SectionHeading } from "./ui";
import { COMMUNITY_URL } from "@/lib/constants";

type Step = {
  title: string;
  text: React.ReactNode;
  Icon: LucideIcon;
};

const STEPS: Step[] = [
  {
    title: "Điền đơn xét tuyển",
    text: "Hoàn thành form đăng ký để ghi nhận hồ sơ ưu tiên.",
    Icon: FileText,
  },
  {
    title: "Tham gia cộng đồng",
    text: (
      <>
        Cộng đồng mở{" "}
        <a
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-red-brand underline decoration-2 underline-offset-2 transition-colors duration-200 hover:text-red-strong"
        >
          NextGen Elite - Tinh hoa tự chủ
        </a>{" "}
        chia sẻ kiến thức, kết nối và nhận thông tin cơ hội.
      </>
    ),
    Icon: Users,
  },
  {
    title: "Phỏng vấn đánh giá độ phù hợp",
    text: "Đánh giá tư duy, kỹ năng và định hướng sự nghiệp.",
    Icon: MessageSquare,
  },
  {
    title: "Gia nhập",
    text: "Bắt đầu lộ trình học tập, rèn luyện và thực chiến tại doanh nghiệp.",
    Icon: Rocket,
  },
];

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="lo-trinh" className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Lộ trình gia nhập"
            title={<>Bốn bước, không có bước nào bạn phải đoán</>}
            lead="Từ lúc bấm nút đăng ký đến lúc ngồi vào chỗ làm thật."
          />
        </Reveal>

        <div className="relative mt-14 lg:mt-20">
          {/* Đường nối: dọc trên di động, ngang trên desktop. Trang trí thuần tuý. */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-[3px] rounded-full bg-line lg:left-0 lg:top-[31px] lg:h-[3px] lg:w-full"
          >
            {/* Hai thanh riêng cho hai trục: trên di động đường chạy DỌC nên
                phải scaleY, trên desktop nó nằm NGANG nên phải scaleX. Một
                thanh dùng chung sẽ mọc sai chiều ở một trong hai khung nhìn. */}
            <motion.div
              className="h-full w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--c-red),var(--c-orange),var(--c-green))] lg:hidden"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            <motion.div
              className="hidden h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,var(--c-red),var(--c-orange),var(--c-green))] lg:block"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <RevealGroup
            as="ol"
            className="relative grid gap-9 lg:grid-cols-4 lg:gap-7"
          >
            {STEPS.map(({ title, text, Icon }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group relative flex gap-5 pl-0 lg:flex-col lg:gap-4"
              >
                <span
                  aria-hidden
                  className="relative z-10 grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full border-[3px] border-line bg-paper text-ink transition-[border-color,background-color,color] duration-200 group-hover:border-red-brand group-hover:bg-red-brand group-hover:text-on-red"
                >
                  <Icon size={24} strokeWidth={2} />
                </span>

                <div className="pt-1 lg:pt-2">
                  <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-orange-text">
                    Bước 0{i + 1}
                  </p>
                  <h3 className="mt-1.5 text-balance font-display text-[19px] font-extrabold leading-snug text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-pretty text-[15.5px] leading-relaxed text-ink-72">
                    {text}
                  </p>
                </div>
              </motion.li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
