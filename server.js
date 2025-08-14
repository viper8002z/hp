const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 10000;

// Generic HTTP/HTTPS proxy: forwards all requests to the requested host
app.use('/', createProxyMiddleware({
  target: 'http://localhost',   // Placeholder, will be overridden by req.url
  changeOrigin: true,
  router: (req) => {
    // Construct target dynamically based on full original URL
    return req.url.startsWith('http') ? req.url : `http://${req.headers.host}${req.url}`;
  },
  logLevel: 'info',
  secure: false,
}));

app.listen(PORT, () => {
  console.log(`Generic HTTP/HTTPS proxy running on port ${PORT}`);
});
