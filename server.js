const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
    // Default to index.html for root
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'text/plain';
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If not found, try index.html (for SPA routing)
            if (err.code === 'ENOENT' && !ext) {
                filePath = path.join(PUBLIC_DIR, 'index.html');
                fs.readFile(filePath, (err2, data2) => {
                    if (err2) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 - File Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data2);
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - File Not Found');
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🔥 CYBER DEFENSE PORTFOLIO SERVER ACTIVE`);
    console.log(`📡 Server running at http://localhost:${PORT}`);
    console.log(`✓ Access your portfolio at: http://localhost:${PORT}`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});
