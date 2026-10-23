const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Hàm khởi động server tự động chọn port nếu port bị chiếm
function startServer(port) {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`=======================================================`);
    console.log(`🚀 TikTok Live Overlay Server đang chạy thành công!`);
    console.log(`👉 Link gắn vào OBS / TikTok Studio: http://localhost:${port}`);
    console.log(`👉 Bấm phím 'C' trên giao diện để mở Bảng Cấu Hình`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Cổng ${port} đã có ứng dụng khác sử dụng, thử cổng ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Lỗi khởi động server:', err);
    }
  });
}

startServer(DEFAULT_PORT);
