#!/usr/bin/env node

const program = require('commander')

program
  .version('0.0.1')
  .description('Local share service')
  .command('config', 'configure shared directory and port')
  .command('start', 'start the server')
  .parse(process.argv)
