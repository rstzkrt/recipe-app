const { ApiErr } = require('../helpers')
const httpStatus = require('http-status')

const sendError = (err, res) => {
    console.error('ERROR 💥:', err)

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

// Custom error handler.
exports.handler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    sendError(err, res)
}

// Catch 404 and forward to error handler.
exports.notFound = (req, res, next) => {
    const statusCode = httpStatus.NOT_FOUND
    const message = `${req.url} Route ${httpStatus['404']}`
    const err = new ApiErr(statusCode, message)

    return exports.handler(err, req, res)
}
