const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  // Proxy middleware for api/shiftdata
  app.use(
    '/api/aosd-shift-reporting-backend',
    createProxyMiddleware({
      target: 'https://accel-webapp-dev.slac.stanford.edu',
      changeOrigin: true,
      secure: true,
      //pathRewrite: {'/api/aosd-shift-reporting-backend': ''},
    })
  );
/*
   // Proxy middleware for api/programdata
   app.use(
    '/api/aosd-shift-reporting-backend/programdata',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
      pathRewrite: {'^/api/aosd-shift-reporting-backend/programdata': ''},
    })
  );
*/
};