
exports.errorHandler = ((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || 'Not Found'
        }
    })
})
