const bodyParser = require('body-parser')
const app = require('express')()
const models = require('./models')
app.use(bodyParser.json())
app.post('/login', async (req, res) => {
  const account = await models.User.findOne({ where: { email: req.body.email } })
  res.json({ data: account })
})


module.exports = app