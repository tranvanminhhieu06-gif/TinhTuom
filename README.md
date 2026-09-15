# NextGen Elite — Tinh hoa tự chủ (landing page)

Next.js App Router · Tailwind · framer-motion · lucide-react

```
app/
  layout.tsx      font VI (Be Vietnam Pro + Inter), metadata, skip-link
  page.tsx        xếp chồng các section + footer
  globals.css     TOKEN màu — sửa màu ở đây, không sửa trong component
components/
  Hero.tsx        header dính + hero + dải đối tác
  CoreValues.tsx  3 trụ cột
  Audience.tsx    chân dung: dành cho bạn / không phù hợp
  Process.tsx     lộ trình 4 bước
  RegistrationForm.tsx  đơn xét tuyển + popup thành công
  Reveal.tsx      fade-up dùng chung (tôn trọng prefers-reduced-motion)
  ui.tsx          nút CTA, tiêu đề section, logo SVG
lib/constants.ts  COMMUNITY_URL + FORM_ENDPOINT
```

## Chạy

```bash
npm i framer-motion lucide-react
npm run dev
```

## Bảng màu và tỷ lệ tương phản (đo thật, WCAG 2.1)

| Cặp màu | Tỷ lệ | Dùng được cho |
|---|---|---|
| `#042719` trên `#FEFEFE` | **15.9** ✓ | mọi cỡ chữ |
| `#3B564B` trên `#FEFEFE` | **7.95** ✓ | thân bài |
| `#546C62` trên `#FEFEFE` | **5.63** ✓ | chữ phụ, helper text |
| trắng trên `#E31837` | **4.72** ✓ | chữ trên nút đỏ |
| trắng trên `#C4142F` (hover) | **6.02** ✓ | nút đỏ lúc rê chuột |
| `#E31837` trên `#FEFEFE` | **4.68** ✓ | chữ đỏ |
| `#F39200` trên `#FEFEFE` | **2.35** ✗ | **không dùng cho chữ** |
| `#8A5200` trên `#FEFEFE` | **6.33** ✓ | biến thể chữ của cam |
| `#16A34A` trên `#FEFEFE` | **3.3** | icon/viền (≥3:1), **không** cho chữ nhỏ |
| `#15803D` trên `#FEFEFE` | **4.97** ✓ | chữ xanh lá |
| `#042719` trên `#16A34A` | **4.87** ✓ | chữ trên mảng xanh |
| trắng trên `#16A34A` | **3.3** ✗ | **không dùng** |

Ba hệ quả đã áp vào code:

1. **Cam không bao giờ là chữ trên nền sáng.** Eyebrow, nhãn "Bước 0x", tag thẻ đều
   dùng `--c-orange-text` `#8A5200`; `#F39200` nguyên bản chỉ xuất hiện ở icon, gạch
   chân highlight và mảng trang trí.
2. **Cột "Dành cho bạn" dùng chữ MỰC trên nền xanh**, không phải chữ trắng.
   Cột "Không phù hợp" mới dùng chữ trắng trên đỏ.
3. **Nút đỏ hover thì ĐẬM lên** (`#C4142F`), không nhạt đi — nhạt đi sẽ làm nút
   rớt chuẩn đúng lúc người dùng chạm vào.

Viền ô nhập dùng `#6D8179` (4.11:1) chứ không phải xám nhạt: viền input là UI
component, cần ≥3:1.

## Biểu mẫu

- Nhãn luôn hiện, placeholder không thay nhãn.
- Lỗi hiện tại từng ô (`aria-describedby` + `aria-invalid`) **và** một bảng tóm tắt
  `role="alert"` ở đầu form; sau lần gửi hỏng, tiêu điểm nhảy vào bảng tóm tắt, mỗi
  dòng là link tới đúng ô sai.
- Chỉ kiểm tra sau lần bấm gửi đầu tiên — không mắng người dùng lúc họ đang gõ dở.
- Popup: `role="dialog"` + `aria-modal`, giữ tiêu điểm trong popup, Esc để đóng,
  trả tiêu điểm về chỗ cũ, khoá cuộn nền.

## Còn treo

- **`FORM_ENDPOINT` chưa có.** Đặt `NEXT_PUBLIC_FORM_ENDPOINT` trong `.env.local`
  (Apps Script / Formspree / n8n). Chưa có thì form vẫn hiện popup nhưng **hồ sơ
  không được lưu ở đâu cả** — có cảnh báo trong console.
- **Logo**: `components/ui.tsx` đang dựng con dấu bằng SVG tạm. Thay bằng file gốc.
  Dải đối tác trong `Hero.tsx` cũng đang là khối chữ tắt, chỗ thay `<Image>` đã đánh dấu.
- **Tag ở 3 thẻ trụ cột** ("Dự án thật" / "Mentor 1 năm" / "Thực tập có lương") lấy
  nguyên từ brief nhưng không khớp với tiêu đề thẻ. Xoá dòng `<span>` tag trong
  `CoreValues.tsx` là gọn, nếu đó là phần thừa.
