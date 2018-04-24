const colors = require('colors')

function print (message, type, spacing = false) {
  const icon = type === 'success' ? '✔' : type === 'error' ? '✗' : ''
  const color = type === 'success' ? 'green' : type === 'error' ? 'red' : 'white'
  const addSpacing = spacing ? '\n\n' : ''

  console.log(`${addSpacing}${colors[color](`${icon} ${message}`)}`)
}

module.exports = {
    print
}
