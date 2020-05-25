const CustomError = require("../../helpers/errors/CustomError")
const jwt = require("jsonwebtoken")
const { isTokenIncluded, getAccessTokenFromHeaders } = require("../../helpers/authorization/tokenHelpers")
const getAccessToToken = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env
    if (!isTokenIncluded(req)) {

        return next(new CustomError("You are not authorized to access this route", 401))
    }
    const access_token = getAccessTokenFromHeaders(req)
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized to access this route", 401))
        }
        req.user = {
            id : decoded.id,
            name : decoded.name
        }
        next();
    })

}

module.exports = { getAccessToToken }