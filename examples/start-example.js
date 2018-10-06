require('tslib')
require('core-js')
require('ts-node').register({ transpileOnly: true })

const path = require('path')
const StartCommand = require('../src/core/cli/commands/start').default
const example = path.join('examples', process.argv[2])

process.chdir(example)
new StartCommand().execute()
