"use client";

import { motion } from "framer-motion";
import { Brain, Wrench, Briefcase, type LucideIcon } from "lucide-react";
import Reveal, { RevealGroup, fadeUp } from "./Reveal";
import { SectionHeading } from "./ui";

type Pillar = {
  tag: string;
  title: string;
  text: string;
  Icon: LucideIcon;
};

const PILLARS: Pillar[] = [
  {
    tag: "Dự án thật",
    title: "Tư duy tự chủ",
    text: "Rèn luyện bản lĩnh tự định hướng, tác phong làm việc chủ động, trách nhiệm và tự làm chủ giải pháp.",
    Icon: Brain,
  },
  {
    tag: "Mentor 1 năm",
    title: "Đa dạng kỹ năng thực chiến",
    text: "Hợp tác cùng các đơn vị chuyên môn hàng đầu, đào tạo thực học và thực làm trên dự án thật.",
    Icon: Wrench,
  },
  {
    tag: "Thực tập có lương",
    title: "Bảo chứng thực tập chất lượng",
    text: "Kết nối trực tiếp vào các doanh nghiệp đối tác uy tín có chính sách minh bạch, người dẫn dắt (mentor) sát sao và lộ trình thăng tiến sự nghiệp rõ ràng.",
    Icon: Briefcase,
  },
];

export default function CoreValues() {
  return (
    <section id="gia-tri" className="bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Giá trị cốt lõi"
            title={
              <>
                3 Trụ cột <span className="text-green-text">phát triển</span>
              </>
            }
            lead="Ba thứ một sinh viên rời chương trình sẽ mang theo — không phải ba dòng trên CV."
          />
        </Reveal>

        <RevealGroup
          as="div"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
        >
          {PILLARS.map(({ tag, title, text, Icon }, i) => (
            <motion.article
              key={title}
              variants={fadeUp}
              className="group relative flex flex-col gap-4 rounded-card border border-line bg-paper p-6 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-green-brand hover:shadow-[0_18px_40px_-26px_rgba(4,39,25,0.5)] lg:p-7"
            >
              <span
                aria-hidden
                className="absolute right-6 top-6 font-display text-[40px] font-extrabold leading-none text-[rgba(4,39,25,0.07)]"
              >
                0{i + 1}
              </span>

              <span
                aria-hidden
                className="grid h-14 w-14 place-items-center rounded-2xl bg-mist text-green-text ring-1 ring-[rgba(22,163,74,0.32)] transition-colors duration-200 group-hover:bg-green-brand group-hover:text-paper group-hover:ring-green-brand"
              >
                <Icon size={26} strokeWidth={2} />
              </span>

              <span className="w-fit rounded-full bg-mist px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-orange-text">
                {tag}
              </span>

              <h3 className="text-balance font-display text-[21px] font-extrabold leading-snug text-ink">
                {title}
              </h3>

              <p className="text-pretty text-[16px] leading-relaxed text-ink-72">
                {text}
              </p>

              <span
                aria-hidden
                className="mt-auto h-1 w-10 rounded-full bg-green-brand transition-all duration-300 group-hover:w-20 group-hover:bg-red-brand"
              />
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
