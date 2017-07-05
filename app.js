#!/usr/bin/env node
const express = require('express')
const app = express()
const serveIndex = require('serve-index')
const serveStatic = require('serve-static')
const ip = require('ip')
const colors = require('colors')

const PORT = 8080
const SHARED_FOLDER = '/Users/toannguyen/Downloads/Shared'

app.use(serveIndex(SHARED_FOLDER, { icons: true }))
app.use(serveStatic(SHARED_FOLDER))

app.listen(PORT, function () {
  const address = `${ip.address()}:${PORT}`
  pbcopy(address)
  console.log('Service running...\nCoppied to clipboard:', colors.green(address))
})

function pbcopy (data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}
