import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Inter } from "next/font/google";
import "./globals.css";

/* Cả hai font đều có subset "vietnamese" — bắt buộc, nếu không dấu ơ/ư/ế
   sẽ rơi về font dự phòng và lệch khỏi dòng chữ. */
const display = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NextGen Elite — Tinh hoa tự chủ | Tinh Tươm",
  description:
    "Hệ sinh thái bứt phá tiềm năng và trải nghiệm thực chiến: đào tạo tư duy tự chủ, trang bị bộ kỹ năng đa nhiệm và cam kết cơ hội thực tập chất lượng cao.",
  openGraph: {
    title: "NextGen Elite — Tinh hoa tự chủ",
    description:
      "Đừng để 4 năm Đại học trôi qua trong sự thụ động. Đăng ký ngay để tiếp cận hơn 1000 doanh nghiệp uy tín.",
    locale: "vi_VN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // KHÔNG đặt maximumScale/userScalable=no — chặn phóng to là lỗi truy cập.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable}`}>
      <body className="bg-paper font-sans antialiased">
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Bỏ qua điều hướng, tới nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
