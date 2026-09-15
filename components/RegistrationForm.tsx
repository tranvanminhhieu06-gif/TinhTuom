"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, X, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { CtaButton, SectionHeading } from "./ui";
import { COMMUNITY_URL, FORM_ENDPOINT } from "@/lib/constants";

const YEARS = ["Năm 1", "Năm 2", "Năm 3", "Năm 4"] as const;

const GOALS = [
  "Phát triển tư duy",
  "Phát triển kỹ năng chuyên môn",
  "Giao lưu và kết nối",
  "Tìm cơ hội thực tập",
] as const;

type FormState = {
  hoTen: string;
  lienHe: string;
  truong: string;
  namHoc: string;
  mongMuon: string[];
  hanhDong: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  hoTen: "",
  lienHe: "",
  truong: "",
  namHoc: "",
  mongMuon: [],
  hanhDong: "",
};

/* Số VN: 10 chữ số bắt đầu bằng 0, hoặc +84 / 84 rồi 9 chữ số. */
const PHONE_RE = /^(?:0\d{9}|(?:\+?84)\d{9})$/;

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (!v.hoTen.trim()) e.hoTen = "Vui lòng nhập họ và tên của bạn.";
  const phone = v.lienHe.replace(/[\s.-]/g, "");
  if (!phone) e.lienHe = "Vui lòng nhập số điện thoại hoặc Zalo.";
  else if (!PHONE_RE.test(phone))
    e.lienHe = "Số chưa đúng định dạng. Ví dụ: 0912345678.";
  if (!v.truong.trim()) e.truong = "Vui lòng nhập trường và chuyên ngành.";
  if (!v.namHoc) e.namHoc = "Vui lòng chọn năm học hiện tại.";
  if (v.mongMuon.length === 0) e.mongMuon = "Chọn ít nhất một mong muốn.";
  if (v.hanhDong.trim().length < 10)
    e.hanhDong = "Hãy kể ngắn gọn một hành động cụ thể (tối thiểu 10 ký tự).";
  return e;
}

const FIELD_LABEL: Record<keyof FormState, string> = {
  hoTen: "Họ và tên",
  lienHe: "Số điện thoại / Zalo",
  truong: "Trường & Chuyên ngành đang học",
  namHoc: "Năm học hiện tại",
  mongMuon: "Mong muốn của bạn",
  hanhDong: "Một hành động chủ động nhất của bạn",
};

/* ----------------------------- Popup thành công ---------------------------- */

function SuccessModal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Tiêu điểm vào panel, không vào nút đóng — người dùng nghe được tiêu đề trước.
    panelRef.current?.focus();

    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") {
        ev.stopPropagation();
        onClose();
        return;
      }
      if (ev.key !== "Tab") return;

      // Giữ tiêu điểm trong popup
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (ev.shiftKey && document.activeElement === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && document.activeElement === last) {
        ev.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus(); // trả tiêu điểm về chỗ cũ
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <motion.div
        className="absolute inset-0 bg-[rgba(4,39,25,0.62)]"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-card bg-paper p-7 text-center shadow-[0_30px_80px_-30px_rgba(4,39,25,0.6)] sm:p-9"
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng thông báo"
          className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full text-ink-56 transition-colors duration-200 hover:bg-mist hover:text-ink cursor-pointer"
        >
          <X size={20} aria-hidden />
        </button>

        <span
          aria-hidden
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[rgba(22,163,74,0.12)] text-green-text"
        >
          <CheckCircle2 size={34} strokeWidth={2.2} />
        </span>

        <h2
          id={titleId}
          className="mt-5 text-balance font-display text-[24px] font-extrabold leading-snug text-ink sm:text-[27px]"
        >
          Chúc mừng bạn đã hoàn thành bước 1!
        </h2>

        <p id={descId} className="mt-3 text-pretty text-[16px] leading-relaxed text-ink-72">
          Hoàn thiện bước 2 bằng cách ấn vào nút “Tham gia” để vào cộng đồng{" "}
          <strong className="font-bold text-ink">
            NextGen Elite - Tinh hoa tự chủ
          </strong>
          .
        </p>

        <a
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-red-brand px-8 text-[15px] font-bold uppercase tracking-wide text-on-red transition-colors duration-200 hover:bg-red-strong cursor-pointer"
        >
          Tham gia
          <ArrowUpRight size={18} aria-hidden />
          <span className="sr-only">(mở tab mới)</span>
        </a>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 min-h-[44px] w-full text-[14px] font-semibold text-ink-56 underline underline-offset-4 transition-colors duration-200 hover:text-ink cursor-pointer"
        >
          Để sau
        </button>
      </motion.div>
    </div>
  );
}

/* --------------------------------- Biểu mẫu -------------------------------- */

const inputBase =
  "w-full min-h-[52px] rounded-xl border border-line-strong bg-paper px-4 text-[16px] text-ink placeholder:text-ink-56 transition-[border-color,box-shadow] duration-200 hover:border-ink-56 focus:border-ink";

export default function RegistrationForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false); // đã bấm gửi ít nhất 1 lần
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      // Sau lần gửi hỏng đầu tiên mới kiểm lại theo từng lần gõ,
      // để không mắng người dùng ngay khi họ chưa gõ xong.
      if (submitted) setErrors(validate(next));
      return next;
    });
  };

  const toggleGoal = (goal: string) =>
    set(
      "mongMuon",
      values.mongMuon.includes(goal)
        ? values.mongMuon.filter((g) => g !== goal)
        : [...values.mongMuon, goal]
    );

  const onSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      setSubmitted(true);
      const found = validate(values);
      setErrors(found);

      if (Object.keys(found).length > 0) {
        // Đưa tiêu điểm vào bảng tóm tắt lỗi ở đầu form
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      setSending(true);
      try {
        if (FORM_ENDPOINT) {
          await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
          });
        } else {
          // Chưa có endpoint: hồ sơ KHÔNG được lưu ở đâu cả.
          console.warn("[NextGen Elite] FORM_ENDPOINT chưa cấu hình — hồ sơ chưa được lưu.");
          await new Promise((r) => setTimeout(r, 600));
        }
        setOpen(true);
        setValues(EMPTY);
        setSubmitted(false);
        setErrors({});
      } finally {
        setSending(false);
      }
    },
    [values]
  );

  const errorList = (Object.keys(errors) as (keyof FormState)[]).filter(
    (k) => errors[k]
  );
  const showSummary = submitted && errorList.length > 0;

  return (
    <section id="dang-ky" className="bg-mist py-20 lg:py-28">
      <div className="mx-auto max-w-wrap px-5 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Bước 01"
            title="Đăng ký ngay"
            lead="Hồ sơ gửi sớm được xét ưu tiên. Mất khoảng 2 phút."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="mx-auto mt-12 max-w-2xl rounded-card border border-line bg-paper p-6 sm:p-8 lg:mt-14"
          >
            {/* Bảng tóm tắt lỗi — bổ sung cho lỗi tại từng ô, không thay thế */}
            {showSummary ? (
              <div
                ref={summaryRef}
                role="alert"
                tabIndex={-1}
                className="mb-7 rounded-xl border-l-4 border-red-brand bg-[rgba(227,24,55,0.06)] p-4"
              >
                <p className="flex items-center gap-2 font-display text-[16px] font-extrabold text-ink">
                  <AlertCircle size={19} className="text-red-brand" aria-hidden />
                  Còn {errorList.length} mục cần xem lại
                </p>
                <ul className="mt-2 space-y-1.5 pl-1">
                  {errorList.map((k) => (
                    <li key={k}>
                      <a
                        href={`#f-${k}`}
                        className="text-[15px] font-semibold text-red-brand underline underline-offset-2 hover:text-red-strong"
                      >
                        {FIELD_LABEL[k]}: {errors[k]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-6">
              <Field
                id="f-hoTen"
                label="Họ và tên"
                error={errors.hoTen}
                showError={submitted}
              >
                <input
                  id="f-hoTen"
                  name="hoTen"
                  type="text"
                  autoComplete="name"
                  className={inputBase}
                  placeholder="Nguyễn Văn A"
                  value={values.hoTen}
                  onChange={(e) => set("hoTen", e.target.value)}
                  aria-invalid={submitted && !!errors.hoTen}
                  aria-describedby={errors.hoTen ? "e-hoTen" : undefined}
                />
              </Field>

              <Field
                id="f-lienHe"
                label="Số điện thoại / Zalo"
                hint="Chúng tôi liên hệ qua số này để hẹn phỏng vấn."
                error={errors.lienHe}
                showError={submitted}
              >
                <input
                  id="f-lienHe"
                  name="lienHe"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={inputBase}
                  placeholder="0912 345 678"
                  value={values.lienHe}
                  onChange={(e) => set("lienHe", e.target.value)}
                  aria-invalid={submitted && !!errors.lienHe}
                  aria-describedby={
                    [errors.lienHe ? "e-lienHe" : "", "h-lienHe"].filter(Boolean).join(" ") ||
                    undefined
                  }
                />
              </Field>

              <Field
                id="f-truong"
                label="Trường & Chuyên ngành đang học"
                error={errors.truong}
                showError={submitted}
              >
                <input
                  id="f-truong"
                  name="truong"
                  type="text"
                  className={inputBase}
                  placeholder="ĐH Bách Khoa — Công nghệ thông tin"
                  value={values.truong}
                  onChange={(e) => set("truong", e.target.value)}
                  aria-invalid={submitted && !!errors.truong}
                  aria-describedby={errors.truong ? "e-truong" : undefined}
                />
              </Field>

              {/* Năm học — nhóm radio */}
              <fieldset id="f-namHoc" className="border-0 p-0">
                <legend className="mb-2 block text-[15px] font-bold text-ink">
                  Năm học hiện tại <span className="text-red-brand">*</span>
                </legend>
                <div
                  role="radiogroup"
                  aria-invalid={submitted && !!errors.namHoc}
                  aria-describedby={errors.namHoc ? "e-namHoc" : undefined}
                  className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                >
                  {YEARS.map((y) => {
                    const active = values.namHoc === y;
                    return (
                      <label
                        key={y}
                        className={`flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border-2 text-[15px] font-semibold transition-colors duration-200 ${
                          active
                            ? "border-ink bg-ink text-paper"
                            : "border-line-strong bg-paper text-ink-72 hover:border-ink"
                        }`}
                      >
                        <input
                          type="radio"
                          name="namHoc"
                          value={y}
                          checked={active}
                          onChange={() => set("namHoc", y)}
                          className="sr-only"
                        />
                        {y}
                      </label>
                    );
                  })}
                </div>
                <FieldError id="e-namHoc" message={submitted ? errors.namHoc : undefined} />
              </fieldset>

              {/* Mong muốn — nhóm checkbox */}
              <fieldset id="f-mongMuon" className="border-0 p-0">
                <legend className="mb-1 block text-[15px] font-bold text-ink">
                  Mong muốn của bạn <span className="text-red-brand">*</span>
                </legend>
                <p className="mb-2.5 text-[14px] text-ink-56">Chọn nhiều đáp án.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g) => {
                    const active = values.mongMuon.includes(g);
                    return (
                      <label
                        key={g}
                        className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-[15px] font-semibold transition-colors duration-200 ${
                          active
                            ? "border-green-brand bg-[rgba(22,163,74,0.08)] text-ink"
                            : "border-line-strong bg-paper text-ink-72 hover:border-ink"
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="mongMuon"
                          value={g}
                          checked={active}
                          onChange={() => toggleGoal(g)}
                          className="h-5 w-5 shrink-0 accent-[var(--c-green)]"
                        />
                        {g}
                      </label>
                    );
                  })}
                </div>
                <FieldError
                  id="e-mongMuon"
                  message={submitted ? errors.mongMuon : undefined}
                />
              </fieldset>

              <Field
                id="f-hanhDong"
                label="Một hành động chủ động nhất bạn từng làm để thay đổi bản thân trong 6 tháng qua là gì?"
                hint="Không cần dài. Cụ thể là đủ."
                error={errors.hanhDong}
                showError={submitted}
              >
                <textarea
                  id="f-hanhDong"
                  name="hanhDong"
                  rows={4}
                  className={`${inputBase} min-h-[130px] resize-y py-3 leading-relaxed`}
                  placeholder="Ví dụ: mình tự tìm mentor và xin làm không công 2 tháng cho một dự án thật…"
                  value={values.hanhDong}
                  onChange={(e) => set("hanhDong", e.target.value)}
                  aria-invalid={submitted && !!errors.hanhDong}
                  aria-describedby={
                    [errors.hanhDong ? "e-hanhDong" : "", "h-hanhDong"]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                />
              </Field>

              <CtaButton type="submit" disabled={sending} className="mt-1 h-14 w-full text-base">
                {sending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" aria-hidden />
                    Đang gửi…
                  </>
                ) : (
                  "Gửi hồ sơ"
                )}
              </CtaButton>

              {/* Trạng thái gửi cho trình đọc màn hình */}
              <p aria-live="polite" className="sr-only">
                {sending ? "Đang gửi hồ sơ" : ""}
              </p>

              <p className="text-center text-[13.5px] text-ink-56">
                Thông tin chỉ dùng để xét tuyển và liên hệ. Không chia sẻ cho bên thứ ba.
              </p>
            </div>
          </form>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? <SuccessModal onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------- Phụ trợ form ------------------------------ */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[14px] font-semibold text-red-brand">
      <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  showError,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  showError: boolean;
  children: React.ReactNode;
}) {
  const key = id.replace("f-", "");
  return (
    <div>
      {/* Nhãn luôn hiện — placeholder không bao giờ thay nhãn */}
      <label htmlFor={id} className="mb-2 block text-[15px] font-bold text-ink">
        {label} <span className="text-red-brand">*</span>
      </label>
      {hint ? (
        <p id={`h-${key}`} className="mb-2 text-[14px] text-ink-56">
          {hint}
        </p>
      ) : null}
      <div className={showError && error ? "[&>*]:border-red-brand [&>*]:border-2" : ""}>
        {children}
      </div>
      <FieldError id={`e-${key}`} message={showError ? error : undefined} />
    </div>
  );
}
