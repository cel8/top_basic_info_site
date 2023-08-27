const path = require('path');
const http = require('http');
const fs = require('fs');

require('dotenv').config();

const PORT = process.env.USER_PORT || 8080;
const server = http.createServer(async (req, res) => {
  let status = true;
  let contentType = 'text/html';
  const pubdir = path.join(__dirname, 'public');
  let filePath;

  switch(req.url) {
    case '/':
      filePath = path.join(pubdir, 'index.html');
      break;
    case '/styles.css':
      filePath = path.join(pubdir, 'styles.css');
      contentType = 'text/css';
      break;
    case '/favicon.ico':
      filePath = path.join(pubdir, 'favicon.ico');
      contentType = 'image/x-icon';
      break;
    case '/about':
      filePath = path.join(pubdir, 'about.html');
      break;
    case '/contact-me':
      filePath = path.join(pubdir, 'contact-me.html');
      break
    default:
      filePath = path.join(pubdir, '404.html');
      status = false;
      break;
  }
  
  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(`There is an error on server: ${err}`);
      throw err;
    }
    res.writeHead(
      status ? 200 : 404,
      { 'Content-Type': contentType }
    );
    res.write(data);
    res.end()
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
