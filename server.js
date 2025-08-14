const http = require('http');
const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 10000;
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: req.url, changeOrigin: true }, err => {
    res.writeHead(502);
    res.end("Bad gateway: " + err.message);
  });
});

// Handle HTTPS CONNECT method for tunneling
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = require('net').connect(port || 443, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
});

server.listen(PORT, () => console.log(`Generic HTTP/HTTPS proxy running on port ${PORT}`));
