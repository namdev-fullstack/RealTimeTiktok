# 🛡️ GIAO DIỆN TIKTOK LIVE OVERLAY CHỐNG QUÉT TRÙNG LẶP & LỖI XÁC THỰC

> **Phiên bản:** 1.0.0  
> **Tỷ lệ chuẩn:** 9:16 (Dọc - 1080x1920 hoặc 720x1280)  
> **Tương thích:** OBS Studio, TikTok Live Studio, Prism Live Studio, vMix, XSplit,...

---

## 🧐 1. TẠI SAO TIKTOK BẮT XÁC THỰC / BÁO LỖI PHÁT LẠI?

Thuật toán của TikTok sử dụng hệ thống AI phân tích video stream theo thời gian thực:
1. **Perceptual Hash (pHash / dHash):** Cứ mỗi 3 - 5 giây, hệ thống sẽ băm (hash) các khung hình thành chuỗi số đại diện. Nếu video phát lặp đi lặp lại hoặc đứng yên, các mã hash này sẽ **trùng khớp nhau** theo chu kỳ -> TikTok xác định là *"Nội dung ghi sẵn / Phát lại không có người điều khiển"* -> **Kích hoạt pop-up xác thực người dùng hoặc bóp tương tác / ban live**.
2. **Static Background Detection:** Phát hiện nếu khung hình quá tĩnh, không có chuyển động mới ở các góc.
3. **Inactivity Detector:** Không có tương tác mới xuất hiện trên màn hình.

---

## ⚡ 2. CƠ CHẾ CHỐNG QUÉT CỦA OVERLAY NÀY

Giao diện này được trang bị **Anti-Scan Engine đa tầng** nhằm phá vỡ hoàn toàn các thuật toán trên:

1. **Lớp Canvas Hạt Vi Mô (Micro Sub-pixel Noise Layer):**
   - Một lớp canvas phủ trong suốt sinh các hạt photon và pixel ngẫu nhiên ở cấp độ sub-pixel với độ mờ tinh tế.
   - **Kết quả:** Mắt người nhìn vào chỉ thấy hiệu ứng ánh sáng điện ảnh cao cấp, nhưng về mặt thuật toán băm ảnh (pHash), **100% các khung hình (frames) đều có mã hash hoàn toàn độc nhất**, không có 2 mili-giây nào trùng nhau!
2. **Đồng hồ số thời gian thực (Real-time HUD Clock - Mili-giây):**
   - Nhảy số từng mili-giây (`HH:MM:SS:ms`) và ngày tháng thực tế. Khung hình liên tục bị biến đổi giá trị pixel ở cấp độ 60 FPS.
3. **Giả lập sự kiện tương tác thời gian thực (Dynamic Activity Toasts):**
   - Tự động sinh ngẫu nhiên các thông báo người dùng thả tim, tặng hoa hồng, follow, share theo chu kỳ biến thiên (3 - 8 giây/lần), mô phỏng một phòng live đang hoạt động cực kỳ sôi động.
4. **Hiệu ứng tim bay liên tục (Floating Hearts):**
   - Các biểu tượng tim nhiều màu sắc bay lên theo quỹ đạo ngẫu nhiên ở góc phải.
5. **Thanh tin tức & Quote biến đổi (Rotating News Ticker):**
   - Đổi ngẫu nhiên các câu thông báo, đố vui, mẹo livestream.
6. **Watermark vi mô tự dịch chuyển (Micro-Jitter):**
   - Tự động đổi mã token và lệch vị trí ±1~2px để chống thuật toán static mask.

---

## 🚀 3. HƯỚNG DẪN CÁCH GẮN VÀO TIKTOK LIVE STUDIO & OBS

### Cách 1: Chạy Server Nội Bộ (Khuyên dùng)
1. Mở Terminal tại thư mục này và gõ:
   ```bash
   npm start
   ```
2. Mở trình duyệt truy cập: `http://localhost:3001` (hoặc port hiển thị trên terminal).

### Cách 2: Gắn vào OBS Studio / TikTok Live Studio
1. Mở **OBS Studio** hoặc **TikTok Live Studio**.
2. Tại bảng **Nguồn (Sources)**, bấm dấu **`+`** ➔ Chọn **Trình duyệt (Browser Source)**.
3. Cài đặt các thông số:
   - **URL:** `http://localhost:3001` *(hoặc link domain nếu bạn đưa lên mạng)*
   - **Chiều rộng (Width):** `1080`
   - **Chiều cao (Height):** `1920`
   - Tích chọn: **Làm mới trình duyệt khi cảnh hoạt động (Refresh browser when scene becomes active)**
   - Tích chọn: **Tắt nguồn khi không hiển thị (Shutdown source when not visible)**
4. Bấm **OK**.

---

## 🎛️ 4. CÁCH ĐIỀU CHỈNH GIAO DIỆN & BẬT TẮT NỀN TRONG SUỐT

### Phím tắt:
- Bấm phím **`C`** trên bàn phím (hoặc click vào icon bánh răng **⚙️** ở góc trên bên phải) để mở **Bảng Cấu Hình**.

### Các tùy chọn quan trọng:
- **Chế độ Phông Nền (Background):**
  - **Gradient Neon Động:** Phù hợp nếu bạn muốn overlay toàn màn hình.
  - **Trong Suốt (Transparent):** **Rất khuyên dùng cho OBS!** Khung giữa và nền sẽ trở nên trong suốt, bạn chỉ cần xếp lớp nguồn Video/Webcam/Game của bạn ở **dưới** Browser Source.
  - **Chroma Key Xanh Lá (#00FF00):** Dễ dàng dùng bộ lọc Chroma Key trong OBS.
- **Cấp độ Chống Quét:**
  - **Cân Bằng (Balanced):** Mặc định, ổn định và nhẹ mượt.
  - **Tối Đa (Aggressive):** Bật thêm nhiễu hạt sub-pixel và rung vi mô tọa độ, tỷ lệ qua mặt thuật toán quét cao nhất.
- **Tùy chỉnh nhanh qua đường link URL (Query Params):**
  - Trong OBS, bạn có thể truyền trực tiếp tham số vào link:
    ```
    http://localhost:3001?bg=transparent&title=GIAO+LƯU+ĐÊM&name=AdminPro&anti=aggressive
    ```

---

## 💡 5. MẸO QUAN TRỌNG KHI LIVE TRÁNH BỊ QUÉT LỖI XÁC THỰC
1. **Luôn có âm thanh biến thiên:** Không nên để video hoàn toàn im lặng quá 2 phút. Nếu phát video lặp lại, hãy bật thêm nhạc nền lofi/ambient nhẹ chạy ngẫu nhiên.
2. **Không lặp 1 clip dưới 60 giây:** Nếu phát video ngắn lặp đi lặp lại, hãy ghép từ 3 - 5 clip khác nhau để kéo dài chu kỳ tối thiểu 10 - 15 phút.
3. **Giữ overlay luôn ở lớp trên cùng (Top Layer):** Đảm bảo Browser Source luôn nằm trên cùng trong danh sách Sources của OBS để các hạt vi mô và đồng hồ ms luôn được phủ lên trên video chính.
