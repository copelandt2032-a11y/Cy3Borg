const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the frontend files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy Logic
// Intercepts any request to '/proxy' and forwards it to the target site
app.use('/proxy', createProxyMiddleware({
    target: 'https://example.com', // The default site you are proxying
    changeOrigin: true,            // Necessary for virtual hosted sites
    pathRewrite: {
        '^/proxy': '',             // Strips '/proxy' from the forwarded URL
    },
    onProxyRes: function (proxyRes, req, res) {
        console.log(`Proxying request to: ${req.url}`);
    }
}));

app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
});
