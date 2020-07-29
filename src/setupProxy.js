const { createProxyMiddleware }  = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', createProxyMiddleware( { target: 'https://localhost:44322/'}))
    app.use('/*.svg', createProxyMiddleware( { target: 'https://localhost:44322/' } ))
}