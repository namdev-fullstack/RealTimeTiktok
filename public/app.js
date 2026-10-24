/**
 * TIKTOK LIVE REALTIME BANNER ENGINE
 * Hiển thị Giờ + Ngày tháng tiếng Việt + Title in đậm chuẩn theo mẫu
 */

(function () {
  'use strict';

  const elDate = document.getElementById('currentDate');
  const elTime = document.getElementById('clockTime');
  const elMs = document.getElementById('clockMs');
  const elTitle = document.getElementById('bannerTitle');
  const bannerBar = document.getElementById('bannerBar');

  // Đọc tham số URL
  const params = new URLSearchParams(window.location.search);
  const customTitle = params.get('title');
  const showMs = params.get('ms') !== '0';
  const customDateSize = params.get('date_size');
  const customTitleSize = params.get('title_size');
  const customScale = params.get('scale');

  // Cập nhật tiêu đề nếu có param, mặc định là "IB DÉP LÀO TIEUSU"
  if (customTitle && elTitle) {
    elTitle.textContent = customTitle.toUpperCase();
  }

  if (!showMs && elMs) {
    elMs.style.display = 'none';
  }

  if (customDateSize && elDate) {
    elDate.style.fontSize = customDateSize;
  }

  if (customTitleSize && elTitle) {
    elTitle.style.fontSize = customTitleSize;
  }

  if (customScale && bannerBar) {
    bannerBar.style.transform = `scale(${customScale})`;
  }

  // Danh sách thứ và tháng tiếng Việt theo định dạng ảnh
  const DAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const MONTHS = [
    'Một', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 
    'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Mười Hai'
  ];

  // Hàm tính tuần trong năm (ISO standard)
  function getWeekNumber(d) {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  }

  let lastDateString = '';

  function updateClock() {
    const now = new Date();

    // 1. Giờ : Phút : Giây
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    elTime.textContent = `${hh}:${mm}:${ss}`;

    // 2. Mili-giây (thay đổi liên tục để vô hiệu hóa thuật toán quét hash của TikTok)
    if (showMs && elMs) {
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      elMs.textContent = `.${ms}`;
    }

    // 3. Ngày tháng tiếng Việt: "Thứ Bảy, 24 Tháng Mười, 2026, tuần 43"
    const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    if (dateKey !== lastDateString) {
      lastDateString = dateKey;
      const dayName = DAYS[now.getDay()];
      const dayNum = now.getDate();
      const monthName = MONTHS[now.getMonth()];
      const year = now.getFullYear();
      const week = getWeekNumber(now);

      elDate.textContent = `${dayName}, ${dayNum} Tháng ${monthName}, ${year}, tuần ${week}`;
    }

    requestAnimationFrame(updateClock);
  }

  requestAnimationFrame(updateClock);
})();
