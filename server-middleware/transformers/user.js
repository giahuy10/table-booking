module.exports = {
    listAdmin: ['id', 'email', 'fullName'],
    detail: ['email', 'fullName'],
    store: (req) => {
        return {
            email: req.email,
            fullName: req.fullName,
            password: req.password
        }
    },
    update: (req) => {
        return {
            email: req.email,
            fullName: req.fullName,
        }
    }
}