const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const TaskService = require('./taskService');

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('JSON inválido.');
  }
}

function serveFile(res, filename, contentType) {
  const filePath = path.join(__dirname, '..', 'public', filename);
  fs.readFile(filePath, (error, content) => {
    if (error) return sendJson(res, 404, { error: 'Arquivo não encontrado.' });
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

function createApp(service = new TaskService()) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');

    try {
      if (req.method === 'GET' && url.pathname === '/') {
        return serveFile(res, 'index.html', 'text/html; charset=utf-8');
      }
      if (req.method === 'GET' && url.pathname === '/app.js') {
        return serveFile(res, 'app.js', 'text/javascript; charset=utf-8');
      }
      if (req.method === 'GET' && url.pathname === '/style.css') {
        return serveFile(res, 'style.css', 'text/css; charset=utf-8');
      }
      if (req.method === 'GET' && url.pathname === '/api/tasks') {
        return sendJson(res, 200, service.list());
      }
      if (req.method === 'POST' && url.pathname === '/api/tasks') {
        return sendJson(res, 201, service.create(await readJson(req)));
      }

      const match = url.pathname.match(/^\/api\/tasks\/(\d+)$/);
      if (match && req.method === 'PUT') {
        return sendJson(res, 200, service.update(match[1], await readJson(req)));
      }
      if (match && req.method === 'DELETE') {
        return sendJson(res, 200, service.remove(match[1]));
      }

      return sendJson(res, 404, { error: 'Rota não encontrada.' });
    } catch (error) {
      return sendJson(res, 400, { error: error.message });
    }
  });
}

module.exports = { createApp };
