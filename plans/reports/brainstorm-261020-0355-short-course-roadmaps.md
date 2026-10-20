# Brainstorm: bổ sung lộ trình 2 tháng, 6 tháng, 12 tháng

Trạng thái: đã triển khai trong `public/index.html` · Cập nhật: 2026-10-20 · Nhánh: `claude/great-carson-1ht8gl`

## Bằng chứng hiện trạng

- Repo chỉ có một trang tĩnh `public/index.html` (629 dòng, CSS/JS inline, deploy Vercel với thư mục gốc `public/`) mô tả lộ trình 24 tháng gồm 3 chặng: Cơ bản (T1–8), Nâng cao (T9–17), Thực hành (T18–24).
- Trang 2 năm đang dùng anchor `#tong-quan`, `#lo-trinh`, `#chang-1`, `#chang-2`, `#chang-3`, `#xuyen-suot` cho mục lục.
- Lộ trình 2 năm không ghi số giờ; stack là Golang, ReactJS, Flutter.

## Quyết định đã chốt với người dùng

- Học viên khoá 2 tháng đã biết ít nhất 1 ngôn ngữ lập trình.
- 40/120/240 giờ là giờ luyện tập cùng mentor; trang ghi thêm số giờ tự học khuyến nghị.
- Ba khoá ngắn xếp chồng theo module, không lặp nội dung.
- Stack: Golang + ReactJS, không có Mobile.
- Mỗi khoá có ràng buộc đầu vào riêng.
- Tỷ lệ 1 mentor : 4–5 học viên; giờ mentor là giờ luyện tập theo nhóm.
- Message queue dùng Redis.
- Người đã đi làm từ 1 năm trở lên được vào thẳng module C của khoá 12 tháng, nhưng phải qua bài đánh giá đầu vào; số năm kinh nghiệm chỉ là điều kiện để đăng ký đánh giá.
- Cả 4 lộ trình nằm trong một trang duy nhất (`public/index.html`), mỗi lộ trình có đường dẫn riêng; không tách thành nhiều file trang.

## Giá trị cốt lõi của mọi khoá học

- Tạo môi trường làm việc như ở doanh nghiệp, giúp học viên chuyển từ môi trường học tập sang môi trường làm việc chuyên nghiệp.
- Chuyển kiến thức lý thuyết thành kỹ năng thực hành, giúp học viên tự tin mang kiến thức đã học ở trường vào công việc.

Trên website, hai giá trị này là một khối dùng chung hiển thị ngay dưới phần mở đầu của cả 4 lộ trình.

## Contract

**Outcome:** `public/index.html` chứa cả 4 lộ trình (2 năm, 2 tháng, 6 tháng, 12 tháng) cùng phong cách UpNext. Mỗi lộ trình có đường dẫn riêng để chia sẻ; người xem chuyển qua lại bằng thanh chọn lộ trình mà không tải trang khác.

**Constraints:**
- Nội dung lộ trình 2 năm giữ nguyên và vẫn là nội dung mặc định ở `/`.
- Một file HTML tĩnh, không thêm build tool; tiếng Việt; design token UpNext hiện có; responsive ở chiều rộng điện thoại.
- Anchor hiện có của trang 2 năm (`#chang-1`...) tiếp tục hoạt động.
- Nhóm 4–5 học viên trên 1 mentor. Trong 5 giờ mentor mỗi tuần, mỗi học viên có khoảng 1 giờ được review code và hỏi riêng; phần còn lại là làm bài và chữa bài chung.
- Nhịp chung khoảng 5 giờ mentor mỗi tuần (40h/8 tuần, 120h/26 tuần, 240h/52 tuần).

**Non-goals:** sửa nội dung lộ trình 2 năm; đăng ký, thanh toán, lịch học; hướng Mobile; giáo trình chi tiết từng buổi; tách thành nhiều file trang.

**Acceptance criteria:**
- Mở trực tiếp `/`, `/2-thang`, `/6-thang`, `/12-thang` đều hiển thị đúng lộ trình tương ứng; nút back/forward của trình duyệt chuyển đúng lộ trình.
- Mỗi lộ trình ngắn có: ràng buộc đầu vào, tổng giờ mentor + giờ tự học, phân bổ module theo tuần/tháng, sản phẩm đầu ra, tiêu chí hoàn thành.
- Tổng giờ các module khớp đúng 40/120/240.
- Khoá 2 tháng phủ đủ: tổ chức dự án; sync/async, HTTP, REST API, WebSocket, queue.
- Khoá 12 tháng phủ đủ: kỹ năng giao tiếp, lấy và phân tích yêu cầu, phân tích thiết kế hệ thống, từ requirements đến deploy production.
- Nội dung phần 2 năm không đổi; anchor cũ vẫn cuộn đúng vị trí.
- Không có horizontal scroll ở 375px; light/dark đều đọc được.

## Cấu trúc module

| Module | Giờ mentor | Nằm trong khoá |
|---|---|---|
| A · Nền tảng | 80 | 6T, 12T |
| B · Xây dựng sản phẩm với AI | 40 | 2T, 6T, 12T |
| C · Từ requirements đến production | 120 | 12T |

- **Khoá 2 tháng = B (40h).**
- **Khoá 6 tháng = A (80h) → B (40h).**
- **Khoá 12 tháng = A (80h) → B (40h) → C (120h).**

Nguyên tắc nối module: **đầu ra của module trước chính là ràng buộc đầu vào của module sau.** Học viên khoá 6 tháng và 12 tháng phải đạt đầu vào của module B sau khi xong module A mới được học tiếp.

### Module B · Xây dựng sản phẩm với AI (40h, 8 tuần × 5h)

Học bằng làm: mỗi tuần thêm một kiểu giao tiếp vào cùng một sản phẩm (gợi ý: ứng dụng quản lý công việc có thông báo realtime). Phần khái niệm chỉ giới hạn ở việc giải thích trên chính code vừa viết.

| Tuần | Nội dung thực hành |
|---|---|
| 1 | Tổ chức dự án: cấu trúc repo BE/FE, branch + pull request, issue board, cấu hình môi trường, thiết lập AI coding assistant và quy tắc dùng |
| 2 | Giao tiếp đồng bộ: HTTP, REST API CRUD, status code, validation, tài liệu OpenAPI |
| 3 | Frontend gọi API: React fetch, loading/error state, đăng nhập JWT |
| 4 | Giao tiếp bất đồng bộ: background job, message queue bằng Redis (Redis Streams), xử lý retry |
| 5 | Realtime: WebSocket, so sánh với polling và SSE |
| 6 | Test + dùng AI viết và review test, Docker Compose cho toàn bộ hệ thống |
| 7 | Deploy lên môi trường demo |
| 8 | Demo, vẽ và giải thích luồng giao tiếp FE–BE của chính sản phẩm |

### Module A · Nền tảng (80h)

Golang 20h · Database/SQL 15h · Frontend (HTML/CSS/JS, React cơ bản) 15h · Backend (HTTP server, routing, middleware) 15h · Giao thức mạng (TCP/IP, DNS, HTTP/HTTPS, TLS, WebSocket) 10h · Git & Linux 5h.

### Module C · Từ requirements đến production (120h)

Kỹ năng giao tiếp trong công việc 15h · Lấy và phân tích yêu cầu khách hàng 25h · Phân tích và thiết kế hệ thống 35h · Deploy & vận hành production (CI/CD, cloud, monitoring, bảo mật cơ bản) 30h · Dự án cuối khoá và trình bày 15h. Dự án cuối khoá đi xuyên suốt module C: bắt đầu bằng buổi lấy yêu cầu với "khách hàng" là mentor, kết thúc bằng sản phẩm chạy trên production.

## Ràng buộc đầu vào

### Áp dụng cho cả 3 khoá

- Laptop RAM tối thiểu 8GB (khuyến nghị 16GB) chạy được Docker; kết nối internet ổn định.
- Đọc được tài liệu kỹ thuật tiếng Anh, được phép dùng công cụ dịch.
- Cam kết thời gian mỗi tuần: 5 giờ cùng mentor + 5–8 giờ tự học. Vắng quá 20% giờ mentor thì không xét hoàn thành khoá.

### Khoá 2 tháng (40h) · đầu vào cao nhất

| Tiêu chí | Mức yêu cầu |
|---|---|
| Lập trình | Đã tự viết ít nhất 1 chương trình hoàn chỉnh khoảng 200 dòng trở lên bằng 1 ngôn ngữ bất kỳ; dùng được hàm, struct/class, xử lý lỗi, đọc/ghi file |
| Golang | Không bắt buộc; nếu chưa biết phải tự học Go Tour trước buổi đầu (khoảng 8–10 giờ) |
| Database | Viết được SELECT, INSERT, UPDATE, DELETE, JOIN 2 bảng |
| Web | Đọc hiểu HTML/CSS/JS cơ bản; biết request/response và JSON là gì |
| Git & terminal | clone, commit, push, tạo branch; điều hướng thư mục và chạy lệnh trong terminal |
| Đối tượng phù hợp | Fresher, sinh viên năm cuối đã làm đồ án, dev ở mảng khác muốn chuyển sang làm web |

Bài kiểm tra đầu vào: làm tại nhà trong 2–3 giờ một chương trình CLI đọc file JSON, lọc và ghi kết quả ra file, kèm 1 câu SQL có JOIN. Sau đó phỏng vấn 15 phút với mentor để giải thích code đã nộp. Bài nộp do AI sinh ra mà không giải thích được thì không đạt.

### Khoá 6 tháng (120h)

| Tiêu chí | Mức yêu cầu |
|---|---|
| Lập trình | Đã học lập trình cơ bản (biến, điều kiện, vòng lặp, hàm, mảng) với 1 ngôn ngữ bất kỳ; giải được bài toán đơn giản không cần xem lời giải |
| Database, Web, Git | Không bắt buộc, module A sẽ ôn lại |
| Đối tượng phù hợp | Sinh viên IT từ năm 2, người đã tự học lập trình nền tảng; **không nhận người chưa từng lập trình** |

Bài kiểm tra đầu vào: giải 2 bài lập trình cơ bản trong 60 phút, ngôn ngữ tự chọn, không dùng AI.

Điểm chặn giữa khoá: hết module A (khoảng tháng 4), học viên làm bài kiểm tra đầu vào của khoá 2 tháng. Chưa đạt thì học bù trước khi sang module B.

### Khoá 12 tháng (240h)

| Tiêu chí | Mức yêu cầu |
|---|---|
| Lập trình | Như khoá 6 tháng |
| Giao tiếp | Viết được email/tin nhắn công việc rõ ràng bằng tiếng Việt; sẵn sàng thuyết trình và làm việc trực tiếp với "khách hàng" (mentor đóng vai) |
| Cam kết | 12 tháng liên tục; giờ tự học ở module C tăng lên khoảng 6–8 giờ/tuần vì phải viết tài liệu yêu cầu và thiết kế |
| Đối tượng phù hợp | Người muốn đi làm ở vị trí dev có tiếp xúc khách hàng, hoặc hướng tới vai trò lead/BA kỹ thuật về sau |

Bài kiểm tra đầu vào: như khoá 6 tháng, cộng 15 phút phỏng vấn về động lực và khả năng cam kết thời gian.

#### Vào thẳng module C (dành cho người đã đi làm)

Điều kiện đăng ký: đã đi làm lập trình từ 1 năm trở lên. Kinh nghiệm chỉ cho phép đăng ký đánh giá, không thay thế đánh giá, vì 1 năm đi làm chưa chắc đã có nền tảng tốt. Bài đánh giá kiểm tra đúng đầu ra của module A và module B:

| Phần | Nội dung | Tương ứng |
|---|---|---|
| Bài làm tại nhà (4–6 giờ, được dùng AI) | REST API bằng Golang có CRUD + đăng nhập JWT; 1 tác vụ bất đồng bộ qua Redis; 1 màn hình React gọi API; chạy toàn bộ bằng Docker Compose; có test cho phần nghiệp vụ chính | Đầu ra module B |
| Phỏng vấn kỹ thuật (45–60 phút) | Giải thích code đã nộp và sửa trực tiếp 1 lỗi mentor đưa vào; luồng HTTP request từ browser đến database; khi nào dùng sync, async, WebSocket; index và transaction; DNS, HTTPS, TCP ở mức giải thích được | Đầu ra module A + B |

Kết quả:
- Đạt cả hai phần: vào thẳng module C (120 giờ, khoảng 6 tháng).
- Bài làm đạt nhưng phỏng vấn hổng nền tảng: học bù các phần còn thiếu của module A rồi vào module C.
- Bài làm không đạt: học module B trước, hoặc học khoá 12 tháng từ đầu nếu hổng cả nền tảng.

Điểm chặn giữa khoá:
- Hết module A: làm bài kiểm tra đầu vào của khoá 2 tháng, như khoá 6 tháng.
- Hết module B: sản phẩm của module B phải chạy được trên môi trường demo thì mới vào module C.

## Trình bày trên website

Cả 4 lộ trình nằm trong `public/index.html`. Mỗi lộ trình là một khối nội dung; chỉ khối đang chọn được hiển thị.

- Đường dẫn: `/` (2 năm, mặc định), `/2-thang`, `/6-thang`, `/12-thang`. Vercel rewrite cả 3 đường dẫn này về cùng `index.html` (cấu hình trong `public/vercel.json`); JavaScript đọc `location.pathname` để hiện đúng khối, và dùng `history.pushState` khi bấm thanh chọn lộ trình nên không tải lại trang.
- Anchor cũ của trang 2 năm giữ nguyên tên. Anchor của lộ trình ngắn có tiền tố riêng (ví dụ `#2t-dau-vao`) để không trùng.
- Thanh chọn lộ trình và một bảng so sánh ngắn 4 lộ trình (đối tượng, thời lượng, giờ mentor, đầu ra) đặt ngay dưới hero.

Trade-offs:
- Một file chứa 4 lộ trình sẽ dài khoảng 1.300–1.600 dòng, sửa khó hơn so với tách file. Bù lại CSS và JS không bị lặp, và chỉ có một nơi duy nhất cần cập nhật design.
- Đường dẫn thật (`/2-thang`) phụ thuộc vào rewrite của Vercel. Nếu trang được host ở nơi khác không có rewrite, mở trực tiếp `/2-thang` sẽ báo 404. Nếu cần chạy được ở mọi nơi, dùng hash (`/#2-thang`) thay thế, nhưng khi đó phải xử lý để không xung đột với anchor mục lục hiện có.

Better approaches: none — yêu cầu một trang, nhiều đường dẫn là quyết định của người dùng; rewrite + `pushState` là cách tối thiểu để đường dẫn chia sẻ được mà vẫn giữ một file.

## Rủi ro

- 80h nền tảng cho 6 mảng chỉ đủ ở mức ôn luyện, nên khoá 6 tháng và 12 tháng phải giữ yêu cầu đã học lập trình cơ bản.
- Khoá 2 tháng dựa nhiều vào AI. Rủi ro là học viên làm ra sản phẩm nhưng không giải thích được code; tiêu chí hoàn thành bắt buộc tự giải thích luồng giao tiếp và tự sửa một lỗi do mentor cố ý đưa vào.
- Thiếu 5–8 giờ tự học mỗi tuần thì đầu ra của cả 3 khoá đều không đạt; vì vậy cam kết thời gian là một ràng buộc đầu vào chứ không chỉ là khuyến nghị.

## Câu hỏi còn mở

Không còn.
