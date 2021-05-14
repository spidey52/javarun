const compileJava = require('./java_runner')
const compileNode = require('./js_runner')
const compilePython = require('./py_runner')

module.exports = { compileJava, compileNode, compilePython }