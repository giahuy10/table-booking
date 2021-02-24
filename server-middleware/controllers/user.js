const Base = require('./base')
const UserRepository = require('../repositories/user')
const UserSiteCriteria = require('../criteria/user/user')
const UserAdminCriteria = require('../criteria/user/user')
const UserTranformer = require('../transformers/user')
class UserController extends Base {
    constructor() {
        super()
        this.userRepository = new UserRepository()
    }

    async list(req, res) {
        var items = await this.userRepository.listItem(UserSiteCriteria(req), UserTranformer.listAdmin)
        res.json(items)
    }

    async detail(id, res) {
        var item = await this.userRepository.getItem(id, UserTranformer.detail)
        res.json(item)
    }

    async store(req, res) {
        try {
            await this.userRepository.insert(UserTranformer.store(req))
            res.json({ status: 1 })
        } catch (error) {
            res.status(401).json({ status: 0, msg: error })
        }

    }

    async update(req, id, res) {
        try {
            await this.userRepository.update(UserTranformer.update(req), id)
            res.json({ status: 1 })
        } catch (error) {
            res.status(401).json({ status: 0, msg: error })
        }
    }

    async destroy(id, res) {
        await this.userRepository.delete(id)
        res.json({ status: 1 })
    }
}

module.exports = UserController