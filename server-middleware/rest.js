const bodyParser = require('body-parser')
const app = require('express')()
const models = require('./models')
app.use(bodyParser.json())
app.use(require('./routes'))




module.exports = app