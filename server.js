'use strict';

// Serve only the app's public files, never workspace configuration or secrets.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/app.js', ['app.js', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
]);

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method not allowed');
    return;
  }
  const pathname = new URL(req.url, 'http://server').pathname;
  const file = files.get(pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }
  fs.readFile(path.join(__dirname, file[0]), (error, data) => {
    if (error) {
      console.error('Unable to read public file:', file[0], error.message);
      res.writeHead(500);
      res.end('Unable to load file');
      return;
    }
    res.writeHead(200, {
      'Content-Type': file[1],
      'Content-Length': data.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
});

server.listen(5000, '0.0.0.0', () => {
  console.log('BirdOS is listening on 0.0.0.0:5000');
});
