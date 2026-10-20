# Brainstorm: bổ sung lộ trình 2 tháng, 6 tháng, 12 tháng

Trạng thái: chờ duyệt · Ngày: 2026-10-20 · Nhánh: `claude/great-carson-1ht8gl`

## Bằng chứng hiện trạng

- Repo chỉ có một trang tĩnh `public/index.html` (629 dòng, CSS/JS inline, deploy Vercel) mô tả lộ trình 24 tháng gồm 3 chặng: Cơ bản (T1–8), Nâng cao (T9–17, 1 hướng chính + 1 hướng phụ), Thực hành (T18–24).
- Lộ trình 2 năm không ghi số giờ; stack là Golang, ReactJS, Flutter.

## Quyết định đã chốt với người dùng

- Học viên khoá 2 tháng đã biết ít nhất 1 ngôn ngữ lập trình.
- 40/120/240 giờ là giờ luyện tập cùng mentor; trang ghi thêm số giờ tự học khuyến nghị.
- Ba khoá ngắn xếp chồng theo module, không lặp nội dung.
- Stack: Golang + ReactJS, không có Mobile.

## Contract

**Outcome:** Website có thêm 3 trang lộ trình 2 tháng, 6 tháng, 12 tháng cùng phong cách UpNext với trang 2 năm; người xem chuyển qua lại giữa 4 lộ trình và so sánh được đối tượng, thời lượng, nội dung, đầu ra.

**Constraints:**
- Nội dung lộ trình 2 năm giữ nguyên, URL `/` giữ nguyên.
- Trang tĩnh, không thêm build tool; tiếng Việt; design token UpNext hiện có; responsive ở chiều rộng điện thoại.
- Nhịp chung khoảng 5 giờ mentor mỗi tuần (40h/8 tuần, 120h/26 tuần, 240h/52 tuần).

**Non-goals:** sửa nội dung lộ trình 2 năm; đăng ký, thanh toán, lịch học; hướng Mobile; giáo trình chi tiết từng buổi.

**Acceptance criteria:**
- 3 trang mới truy cập được, mỗi trang có: đối tượng đầu vào, tổng giờ mentor + giờ tự học, phân bổ module theo tuần/tháng, sản phẩm đầu ra, tiêu chí hoàn thành.
- Tổng giờ các module khớp đúng 40/120/240.
- Khoá 2 tháng phủ đủ: tổ chức dự án; sync/async, HTTP, REST API, WebSocket, queue.
- Khoá 12 tháng phủ đủ: kỹ năng giao tiếp, lấy và phân tích yêu cầu, phân tích thiết kế hệ thống, từ requirements đến deploy production.
- Trang 2 năm chỉ thay đổi ở thanh chuyển lộ trình (nếu có); nội dung còn lại không đổi.
- Không có horizontal scroll ở 375px; light/dark đều đọc được.

## Cấu trúc module đề xuất

| Module | Giờ mentor | Nằm trong khoá |
|---|---|---|
| A · Nền tảng | 80 | 6T, 12T |
| B · Xây dựng sản phẩm với AI | 40 | 2T, 6T, 12T |
| C · Từ requirements đến production | 120 | 12T |

- **Khoá 2 tháng = B (40h).**
- **Khoá 6 tháng = A (80h) → B (40h).**
- **Khoá 12 tháng = A (80h) → B (40h) → C (120h).**

### Module B · Xây dựng sản phẩm với AI (40h, 8 tuần × 5h)

Học bằng làm: mỗi tuần thêm một kiểu giao tiếp vào cùng một sản phẩm (gợi ý: ứng dụng quản lý công việc có thông báo realtime). Phần khái niệm chỉ giới hạn ở việc giải thích trên chính code vừa viết.

| Tuần | Nội dung thực hành |
|---|---|
| 1 | Tổ chức dự án: cấu trúc repo BE/FE, branch + pull request, issue board, cấu hình môi trường, thiết lập AI coding assistant và quy tắc dùng |
| 2 | Giao tiếp đồng bộ: HTTP, REST API CRUD, status code, validation, tài liệu OpenAPI |
| 3 | Frontend gọi API: React fetch, loading/error state, đăng nhập JWT |
| 4 | Giao tiếp bất đồng bộ: background job, message queue, xử lý retry |
| 5 | Realtime: WebSocket, so sánh với polling và SSE |
| 6 | Test + dùng AI viết và review test, Docker Compose cho toàn bộ hệ thống |
| 7 | Deploy lên môi trường demo |
| 8 | Demo, vẽ và giải thích luồng giao tiếp FE–BE của chính sản phẩm |

### Module A · Nền tảng (80h)

Golang 20h · Database/SQL 15h · Frontend (HTML/CSS/JS, React cơ bản) 15h · Backend (HTTP server, routing, middleware) 15h · Giao thức mạng (TCP/IP, DNS, HTTP/HTTPS, TLS, WebSocket) 10h · Git & Linux 5h.

### Module C · Từ requirements đến production (120h)

Kỹ năng giao tiếp trong công việc 15h · Lấy và phân tích yêu cầu khách hàng 25h · Phân tích và thiết kế hệ thống 35h · Deploy & vận hành production (CI/CD, cloud, monitoring, bảo mật cơ bản) 30h · Dự án cuối khoá và trình bày 15h. Dự án cuối khoá đi xuyên suốt module C: bắt đầu bằng buổi lấy yêu cầu với "khách hàng" là mentor, kết thúc bằng sản phẩm chạy trên production.

## Phương án trình bày trên website

| Phương án | Giả định quan trọng nhất | Hỏng đầu tiên khi |
|---|---|---|
| **1. Mỗi khoá một trang (`/2-thang/`, `/6-thang/`, `/12-thang/`) + thanh chuyển lộ trình** (khuyến nghị) | Người xem thường chỉ quan tâm một khoá | Cần so sánh nhanh 4 khoá: giải bằng một bảng so sánh ngắn trên mỗi trang mới |
| 2. Trang hub so sánh ở `/`, chuyển lộ trình 2 năm sang `/2-nam/` | Hub là cửa vào chính | Link cũ đã chia sẻ trỏ vào `/` không còn là lộ trình 2 năm, trái yêu cầu giữ nguyên |
| 3. Gộp cả 4 lộ trình vào `index.html` dạng tab | Một file dễ quản lý | Trang 2 năm phải tái cấu trúc, file vượt 1.500 dòng, khó bảo trì |

Đề xuất phương án 1. CSS chung tách ra `public/assets/site.css` để 4 trang dùng chung thay vì chép 4 lần; `index.html` chỉ đổi phần tham chiếu CSS và thêm thanh chuyển lộ trình, nội dung không đổi.

Better approaches: none — hướng xếp chồng module là hướng người dùng đã chọn (rõ ràng theo yêu cầu "12 tháng bao gồm 2 tháng và 6 tháng").

## Rủi ro

- 80h nền tảng cho 6 mảng chỉ đủ ở mức ôn luyện. Khoá 6 tháng cần yêu cầu đầu vào là đã học lập trình cơ bản (ví dụ sinh viên IT), không nhận người mới hoàn toàn.
- Khoá 2 tháng dựa nhiều vào AI. Rủi ro là học viên làm ra sản phẩm nhưng không giải thích được code; tiêu chí hoàn thành cần bắt buộc tự giải thích luồng giao tiếp và tự sửa một lỗi do mentor đưa vào.
- Giờ tự học khuyến nghị đề xuất 5–8 giờ/tuần (tỷ lệ khoảng 1:1 đến 1:1,5 so với giờ mentor). Nếu học viên không có thời gian này, đầu ra của cả 3 khoá đều không đạt.

## Câu hỏi còn mở

- Tỷ lệ mentor/học viên (1:1 hay theo nhóm) ảnh hưởng hình thức luyện tập; mặc định ghi "theo nhóm nhỏ" nếu không có thông tin khác.
- Message queue dùng công nghệ cụ thể nào (Redis, RabbitMQ, NATS); mặc định đề xuất RabbitMQ.
