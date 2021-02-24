const repository = require('../repositories/base')
class BaseController {
    constructor () {
        this.repository = new repository()
    }
    list(req, res) {
        var items = this.repository.listItem(req)
        res.send(items)
    }

    detail(req, res) {
        res.send('Users Get Route 23')
    }

    store(req, res) {
        res.send('Users Get Route 23')
    }

    update(req, res) {
        res.send('Users Get Route 23')
    }

    destroy(req, res) {
        res.send('Users Get Route 23')
    }
}

module.exports = BaseController