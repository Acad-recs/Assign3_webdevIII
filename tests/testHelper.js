const http = require('http');

/**
 * Executes an HTTP request against the API and resolves with status and parsed JSON.
 */
function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const { method = 'GET', body = null, headers = {} } = options;
    const bodyStr = body ? JSON.stringify(body) : '';

    const reqHeaders = {
      ...headers,
      ...(body ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
    };

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: process.env.PORT || 5000,
        path,
        method,
        headers: reqHeaders,
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(rawData);
          } catch (e) {
            parsed = rawData;
          }
          resolve({ status: res.statusCode, data: parsed });
        });
      }
    );

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

module.exports = {
  request,
};
