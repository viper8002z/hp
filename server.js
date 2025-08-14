const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 10000;

app.use('/', createProxyMiddleware({
  target: 'http://example.com',
  changeOrigin: true,
  logLevel: 'info',
  secure: false,
}));

app.listen(PORT, () => {
  console.log(`HTTP proxy running on port ${PORT}`);
});
