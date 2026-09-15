"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Reveal, { RevealGroup, fadeUp } from "./Reveal";
import { SectionHeading } from "./ui";

const FIT = [
  {
    label: "Định hướng giá trị thực",
    text: "Mong muốn xây dựng năng lực chuyên môn và kết quả thực tế, thay vì chỉ tích lũy chứng chỉ.",
  },
  {
    label: "Năng lực tự chủ",
    text: "Tiếp cận nhiệm vụ từ góc độ giải quyết vấn đề, chủ động tối ưu hiệu suất mà không cần giám sát liên tục.",
  },
  {
    label: "Sẵn sàng đón nhận cơ hội và thử thách",
    text: "Dám bước ra khỏi vùng an toàn, xem phản biện và áp lực là đòn bẩy bứt phá bản thân.",
  },
];

const UNFIT = [
  {
    label: "Thực dụng ngắn hạn",
    text: "Thích an nhàn và chỉ tìm kiếm con dấu báo cáo thực tập đối phó.",
  },
  {
    label: "Tư duy phụ thuộc",
    text: "Chờ phân công chi tiết, chờ cầm tay chỉ việc, thiếu sự quyết liệt và thoái thác trách nhiệm khi gặp rào cản.",
  },
  {
    label: "Thiếu tính bền bỉ",
    text: "Ngại va chạm chuyên môn, dễ thoái chí hoặc nản lòng trước các tiêu chuẩn cao.",
  },
];

type ColumnProps = {
  tone: "fit" | "unfit";
  title: string;
  items: { label: string; text: string }[];
};

function Column({ tone, title, items }: ColumnProps) {
  const fit = tone === "fit";
  const Icon = fit ? Check : X;

  return (
    <motion.div
      variants={fadeUp}
      className={`flex flex-col overflow-hidden rounded-card border bg-paper ${
        fit ? "border-[rgba(22,163,74,0.5)]" : "border-[rgba(227,24,55,0.4)]"
      }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-5 ${
          fit ? "bg-green-brand" : "bg-red-brand"
        }`}
      >
        <span
          aria-hidden
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper ${
            fit ? "text-green-text" : "text-red-brand"
          }`}
        >
          <Icon size={20} strokeWidth={3} />
        </span>
        {/* Chữ trắng trên xanh #16A34A chỉ 3.3:1 (rớt). Cột xanh dùng chữ MỰC
            (4.87:1 ✓), cột đỏ dùng chữ trắng (4.72:1 ✓). */}
        <h3
          className={`font-display text-[19px] font-extrabold sm:text-[21px] ${
            fit ? "text-ink" : "text-on-red"
          }`}
        >
          {title}
        </h3>
      </div>

      <ul className="flex flex-1 flex-col divide-y divide-line px-6">
        {items.map((item) => (
          <li key={item.label} className="flex gap-3.5 py-5">
            <span
              aria-hidden
              className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                fit
                  ? "bg-[rgba(22,163,74,0.12)] text-green-text"
                  : "bg-[rgba(227,24,55,0.10)] text-red-brand"
              }`}
            >
              <Icon size={15} strokeWidth={3} />
            </span>
            <p className="text-pretty text-[15.5px] leading-relaxed text-ink-72">
              <strong className="font-bold text-ink">{item.label}:</strong>{" "}
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Audience() {
  return (
    <section id="chan-dung" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Chân dung thành viên"
            title={
              <>
                Chương trình này dành cho ai — và{" "}
                <span className="text-red-brand">không dành cho ai</span>
              </>
            }
            lead="Chúng tôi nói rõ từ đầu để bạn không mất thời gian, và chúng tôi cũng vậy."
          />
        </Reveal>

        {/* Hai cột trên desktop, xếp chồng thành hai thẻ trên di động —
            không dùng bảng cuộn ngang. */}
        <RevealGroup
          as="div"
          className="mt-12 grid items-stretch gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6"
        >
          <Column tone="fit" title="Dành cho bạn" items={FIT} />
          <Column tone="unfit" title="Không phù hợp" items={UNFIT} />
        </RevealGroup>
      </div>
    </section>
  );
}
