---
trigger: always_on
---

# Antigravity Frontend Rules (Next.js SSR-only)

## 1) Mục tiêu

- Code **các trang mới** theo chuẩn **Server Side Rendering / Server Components** của Next.js.
- **TUYỆT ĐỐI KHÔNG** dùng Client Side cho **page**.
- Mỗi trang phải có **SEO meta đầy đủ** (title/description/canonical/OG/Twitter/robots).
- Giữ code nhất quán với codebase hiện tại, tái sử dụng component/layout đã có.

---

## 2) Ràng buộc bắt buộc (Hard Rules)

### 2.1. Không Client Component cho page

- File `app/**/page.tsx` **KHÔNG ĐƯỢC** có:
  - `"use client"`
  - `useEffect`, `useState`, `useRef`, `useMemo`, `useCallback`
  - `next/dynamic` với `{ ssr: false }`
  - Bất kỳ logic phụ thuộc browser (`window`, `document`, `localStorage`, `sessionStorage`)
- `page.tsx` phải là **Server Component** (mặc định trong App Router).

### 2.2. Data fetching phải chạy trên server

- Gọi API/data trong server component hoặc server utility:
  - `await fetch(...)` trong `page.tsx` hoặc trong `lib/server/*`
  - Ưu tiên `cache`, `revalidate`, và `tags` rõ ràng khi cần.
- Nếu cần xử lý form/action: dùng **Server Actions** (không dùng client form handler nếu không bắt buộc).

### 2.3. SEO meta bắt buộc cho mọi route

Mỗi trang phải có đủ:

- `title`
- `description`
- `alternates.canonical`
- `openGraph` (title, description, url, siteName, images, type)
- `twitter` (card, title, description, images)
- `robots` (index/follow + googleBot)
- (Nếu phù hợp) `keywords`, `authors`, `metadataBase`

**Không** để meta mặc định chung chung cho trang con. Mỗi route phải có meta riêng.

---

## 3) Chuẩn cấu trúc thư mục (khuyến nghị)

- `app/(public)/...` cho các trang public
- `app/(dashboard)/...` cho khu vực nội bộ (nếu có)
- `app/.../page.tsx` là SSR-only
- `app/.../loading.tsx` và `error.tsx` nếu cần UX tốt
- `lib/server/*` chứa hàm fetch/data mapper chạy server
- `components/*`:
  - Component mặc định là server component nếu không cần client.
  - Component client chỉ khi thật sự cần tương tác UI; và phải tách riêng.

---

## 4) Quy ước code & chất lượng

- TypeScript strict, không `any` tuỳ tiện.
- Không duplicate logic; tạo util ở `lib/server/*` hoặc `lib/*`.
- UI: ưu tiên component đã có trong codebase.
- Accessibility: heading đúng thứ bậc, alt cho ảnh, aria khi cần.
- Không hardcode URL tuyệt đối bừa bãi; dùng `metadataBase` + `canonical`.

## 5) Các text mà nằm trên background màu tối thì phải có màu sáng phải dùng "!" vì global.css đang config cứng

---
