/**
 * Nhận form đăng ký trên site chính (public/index.html, #dang-ky-form) và thêm mỗi học viên một dòng
 * vào trang tính "Đăng ký" của Google Trang tính chứa script này.
 *
 * Cài đặt một lần (tên menu theo giao diện Google tiếng Việt):
 *  1. Tạo một Google Trang tính, mở Tiện ích > Apps Script, xoá code mẫu, dán toàn bộ file này vào rồi bấm Lưu.
 *  2. Bấm Triển khai > Tác vụ triển khai mới > biểu tượng bánh răng > Ứng dụng web.
 *     Thực thi dưới dạng: Tôi. Người có quyền truy cập: Bất kỳ ai. Bấm Triển khai, rồi Uỷ quyền truy cập.
 *     Nếu Google báo "Google chưa xác minh ứng dụng này": bấm Nâng cao > Truy cập ... (không an toàn) > Cho phép.
 *     Đây là script của chính bạn, nên cảnh báo này là bình thường.
 *  3. Sao chép URL ứng dụng web (kết thúc bằng /exec), dán vào action="" của form trong public/index.html, rồi deploy site.
 *  4. Gửi thử form một lần trên site và kiểm tra có thêm một dòng trong trang tính "Đăng ký".
 *
 * Sửa code về sau: Triển khai > Quản lý các tác vụ triển khai > bút chì (Chỉnh sửa) > Phiên bản: Phiên bản mới > Triển khai.
 * Cách này giữ nguyên URL. Còn "Tác vụ triển khai mới" sẽ tạo URL khác, và site vẫn gửi về URL cũ.
 *
 * URL này công khai như mọi thứ trong trang tĩnh, nên script kiểm tra lại từng trường. Mỗi giá trị được lưu với dấu
 * nháy đơn ở đầu để Trang tính giữ nguyên dạng chữ: số điện thoại không mất số 0 đầu, và nội dung bắt đầu bằng "="
 * không chạy thành công thức. Các cột bên phải sáu cột dưới đây (ví dụ "Đã gọi") script không đụng tới.
 */
var SHEET_NAME = 'Đăng ký';
var HEADERS = ['Thời gian', 'Họ tên', 'SĐT', 'Email', 'Lộ trình quan tâm', 'Trang'];
var ROUTES = ['', '2 tháng', '6 tháng', '12 tháng', '2 năm', 'Chưa chắc'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return reply('ok'); // hidden field only bots fill

  var ten = text(p.ten, 100);
  var sdt = String(p.sdt || '').replace(/[\s.()-]/g, '');
  var email = text(p.email, 254).toLowerCase();
  var loTrinh = text(p.lo_trinh, 20);
  var trang = text(p.trang, 200);
  if (ten.length < 2 || !/^(0|\+?84)[35789]\d{8}$/.test(sdt) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || ROUTES.indexOf(loTrinh) < 0) {
    return reply('invalid');
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([new Date()].concat([ten, sdt, email, loTrinh, trang].map(function (v) { return "'" + v; })));
  } finally {
    lock.releaseLock();
  }
  return reply('ok');
}

function text(v, max) {
  return String(v || '').trim().slice(0, max);
}

function reply(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}
