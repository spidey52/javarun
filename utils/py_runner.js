const { spawn } = require('child_process');
const chalk = require('chalk');

const compilePython = async (name) => {
  if (name.ref) {
    console.log(chalk.red('>>> closing the program change detected <<<'))
    name.ref.kill()
  }

  try {
    console.log(chalk.green('[loading the program]'))
    console.log(chalk.green('[running the program]'))
    name.ref = spawn(`python3`, [name.filename], { stdio: 'inherit' })
  } catch (error) {
    console.log(chalk.red('[error in loading the program]'))
    console.log(chalk.red('[error in running the program]'))
    console.log(chalk.red(error.stderr))
  }
}

module.exports = compilePython
