#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util')
const chalk = require('chalk')


const pexec = promisify(exec)

const compileFile = async (filename) => {
  try {
    console.log(chalk.green('[loading the program]'))
    await pexec(`javac ${filename}`)
    const follow = await pexec(`java ${filename.split('.')[0]}`)
    console.log(chalk.green('[running the program]'))
    console.log(follow.stdout)
  } catch (error) {
    console.log(chalk.red('[error in loading the program]'))
    console.log(chalk.red('[error in running the program]'))
    console.error(chalk.red(error.stderr))
  }
  console.log(chalk.green('[endingthe program]'))
  console.log(chalk.green('>>> watching for file changes...'))
}


program
  .version('0.0.1')
  .argument('<filename>', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }
    const start = debounce(() => {
      compileFile(name)
    }, 100);

    chokidar
      .watch('*.java')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);




