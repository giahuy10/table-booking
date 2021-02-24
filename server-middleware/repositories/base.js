class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async listItem(filter, attrs = null) {
        return await this.model.findAll({where: filter, attributes: attrs})
    }
    async getItem(id, attrs = null) {
        return await this.model.findByPk(id, {attributes: attrs})
    }
    async insert(data) {
        return await this.model.create(data);
    }
    async update(data, id) {
        return await this.model.update(data, {where: {id: id}});
    }
    async delete(id) {
        return await this.model.destroy({where: {id: id}});
    }
}

module.exports = BaseRepository