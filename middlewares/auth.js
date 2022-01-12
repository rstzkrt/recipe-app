const {ApiError} = require('../helpers')
const catchAsync = require('./catchAsync')
const User = require('../components/user/user.model')
const admin = require('firebase-admin')

module.exports.allowIfLoggedIn = catchAsync(async (req, res, next) => {
    let token = req.header('Authorization')
    if (!token) {
        throw new ApiError(400, 'Authorization token not found.')
    }

    token = parseAuthToken(token)
    const decoded = await admin.auth().verifyIdToken(token)
    console.log(decoded)
    console.log(token)
    if (!decoded) {
        throw new ApiError(401, 'Invalid authorization token.')
    }

    const user = await User.findOne({uid: decoded.user_id})
    console.log(user)

    if (!user) {
        throw new ApiError(401, 'Invalid authorization token.')
    }

    req.user = user
    next()
})

parseAuthToken = (token) => {
    if (!token.startsWith('Bearer ')) {
        throw new ApiError(400, 'Invalid authorization header type.')
    }

    return token.replace('Bearer ', '')
}