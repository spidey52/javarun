const { exec, spawn } = require('child_process');
const { promisify } = require('util')
const pexec = promisify(exec)

const chalk = require('chalk');

const compileJava = async (name) => {

  if (name.ref) {
    console.log(chalk.red('>>> closing the program change detected <<<'))
    name.ref.kill()
  }

  try {
    console.log(chalk.green('[loading the program]'))
    console.log(chalk.green('[compiling the program]'))
    await pexec(`javac ${name.filename}`)
    console.log(chalk.green('[running the program]'))
    name.ref = spawn(`java`, [name.filename.split('.')[0]], { stdio: 'inherit' })
  } catch (error) {
    console.log(chalk.red('[error in loading the program]'))
    console.log(chalk.red('[error in running the program]'))
    console.log(chalk.red(error.stderr))
  }
}

module.exports = compileJava
