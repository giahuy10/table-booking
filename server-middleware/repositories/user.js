const Base = require('./base')
const model = require('../models/index').User
const bcrypt = require('bcrypt');
const saltRounds = 10;
class UserRepository extends Base {
    constructor () {
        super(model)
    }
    async insert(req) {
        var data = req
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.password, salt);
        data.password = hash
        return await this.model.create(data);
    }
}

module.exports = UserRepository