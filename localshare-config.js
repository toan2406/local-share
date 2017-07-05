#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const colors = require('colors')
const path = require('path')

program
  .option('-d, --directory <directory>', 'path to the shared directory')
  .option('-p, --port <port>', 'server port number')
  .parse(process.argv)

const config = {
  directory: program.directory,
  port: +program.port
}
const CONFIG_FILE = path.join(__dirname, 'config.json')

fs.writeFileSync(CONFIG_FILE, JSON.stringify(config))
console.log(colors.green('Wrote to', CONFIG_FILE))
