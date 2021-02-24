module.exports = (req) => {
    var filter = {}
    if (req.email) {
        filter.email = req.email
    }
    return filter
}