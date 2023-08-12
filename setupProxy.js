const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/users', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/friend', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/chatting', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
    createProxyMiddleware('/file', {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    }),
  );
  };