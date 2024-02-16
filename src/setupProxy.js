const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  // Proxy middleware for api/shiftdata
  app.use(
    '/api/shiftdata',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      //pathRewrite: {'^/api/shiftdata': ''},
    })
  );

   // Proxy middleware for api/programdata
   app.use(
    '/api/programdata',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      //pathRewrite: {'^/api/programdata': ''},
    })
  );

};