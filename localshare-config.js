#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const colors = require('colors')

program
  .option('-d, --directory <directory>', 'path to the shared directory')
  .option('-p, --port <port>', 'server port number')
  .parse(process.argv)

const config = {
  directory: program.directory,
  port: +program.port
}

fs.writeFileSync('./config.json', JSON.stringify(config))
console.log(colors.green('Done'))
