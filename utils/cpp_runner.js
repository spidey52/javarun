const { exec, spawn } = require('child_process');
const { promisify } = require('util')
const pexec = promisify(exec)

const chalk = require('chalk');

const compileCpp = async (name) => {

  if (name.ref) {
    console.log(chalk.red('>>> closing the program change detected <<<'))
    name.ref.kill()
  }

  try {
    console.log(chalk.green('[loading the program]'))
    console.log(chalk.green('[compiling the program]'))
    await pexec(`g++ ${name.filename}`)
    console.log(chalk.green('[running the program]'))
    name.ref = spawn(`./a.out`, { stdio: 'inherit' })
  } catch (error) {
    console.log(chalk.red('[error in loading the program]'))
    console.log(chalk.red('[error in running the program]'))
    console.log(chalk.red(error.stderr))
  }
}

module.exports = compileCpp
