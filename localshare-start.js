#!/usr/bin/env node

const express = require('express')
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')
const ip = require('ip')
const colors = require('colors')
const config = require('./config.json')

const app = express()

const PORT = config.port || 8080
const SHARED_DIR = config.directory

if (!SHARED_DIR) {
  console.error(colors.red('Shared directory config is missing'))
  process.exit(1)
}

app.use(serveIndex(SHARED_DIR, { icons: true }))
app.use(serveStatic(SHARED_DIR))

app.listen(PORT, function () {
  const address = `${ip.address()}:${PORT}`
  pbcopy(address)
  console.log(
    `Service running...
    Shared folder: ${SHARED_DIR}
    Coppied to clipboard: ${colors.green(address)}`
    .replace(/ {2}/g, '')
  )
})

function pbcopy (data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}
