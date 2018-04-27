#!/usr/bin/env node

const express = require('express');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
const ip = require('ip');
const colors = require('colors');
const config = require('./config.json');
const program = require('commander');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');

program
  .option('-d, --directory <directory>', 'path to the shared directory')
  .option('-p, --port <port>', 'server port number')
  .parse(process.argv);

const app = express();
const PORT = program.port || config.port || 8080;
const SHARED_DIR = program.directory || config.directory;

if (!SHARED_DIR) {
  console.error(colors.red('Shared directory config is missing'));
  process.exit(1);
}

const stats = fs.lstatSync(SHARED_DIR);
const isDirectory = stats.isDirectory();

if (isDirectory) {
  app.use(serveIndex(SHARED_DIR, { icons: true }));
  app.use(serveStatic(SHARED_DIR));
} else {
  app.use(function(req, res) {
    const filename = path.basename(SHARED_DIR);
    const extname = path.extname(SHARED_DIR);
    if (extname === '.mp4') {
      res.sendFile(SHARED_DIR, {
        'accept-ranges': 'bytes',
        'content-length': stats.size,
      });
    } else {
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.sendFile(SHARED_DIR);
    }
  });
}

app.listen(PORT, function() {
  const address = `http://${ip.address()}:${PORT}`;
  pbcopy(address);
  QRCode.toString(address, { type: 'terminal' }).then(code => {
    console.log(
      `Service running...
      Shared ${isDirectory ? 'folder' : 'file'}: ${SHARED_DIR}
      Coppied to clipboard: ${colors.green(address)}`.replace(/ {2}/g, ''),
    );
    console.log('\n');
    console.log(code);
  });
});

function pbcopy(data) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(data);
  proc.stdin.end();
}
