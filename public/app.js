/**
 * TIKTOK LIVE REALTIME CLOCK ENGINE
 * Cập nhật thời gian thực mili-giây liên tục - Chống bot quét video lặp lại
 */

(function () {
  'use strict';

  const elDate = document.getElementById('currentDate');
  const elTime = document.getElementById('clockTime');
  const elMs = document.getElementById('clockMs');
  const clockWrapper = document.getElementById('clockWrapper');

  // Đọc các tham số tùy chọn từ URL
  // Ví dụ: ?ms=1&date=1&scale=1.2&bg=0
  const params = new URLSearchParams(window.location.search);
  const showMs = params.get('ms') !== '0';
  const showDate = params.get('date') !== '0';
  const noBg = params.get('bg') === '0';
  const scale = params.get('scale');
  const customColor = params.get('color');

  if (!showMs && elMs) elMs.style.display = 'none';
  if (!showDate && elDate) elDate.parentElement.style.display = 'none';
  if (noBg && clockWrapper) {
    clockWrapper.style.background = 'transparent';
    clockWrapper.style.border = 'none';
    clockWrapper.style.boxShadow = 'none';
    clockWrapper.style.backdropFilter = 'none';
  }
  if (scale && clockWrapper) {
    clockWrapper.style.transform = `scale(${scale})`;
  }
  if (customColor && elTime) {
    elTime.style.color = customColor;
  }

  function updateClock() {
    const now = new Date();

    // 1. Ngày tháng năm (YYYY-MM-DD)
    if (showDate && elDate) {
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      elDate.textContent = `${y}-${m}-${d}`;
    }

    // 2. Giờ : Phút : Giây (HH:MM:SS)
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    elTime.textContent = `${hh}:${mm}:${ss}`;

    // 3. Mili-giây (.xxx - liên tục thay đổi từng frame để phá vỡ hash quét lặp)
    if (showMs && elMs) {
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      elMs.textContent = `.${ms}`;
    }

    requestAnimationFrame(updateClock);
  }

  // Chạy đồng hồ
  requestAnimationFrame(updateClock);
})();
