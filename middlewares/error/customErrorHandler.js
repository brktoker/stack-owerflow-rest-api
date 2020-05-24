const CustomError = require("../../helpers/errors/CustomError")
const customErrorHandler = (err, req, res, next) => {
    let customError = err

    if (customError.name === "ValidationError") {
        customError = new CustomError(err.message, 400)
    }
    if (customError.name === "SyntaxError") {
        customError = new CustomError(err.message, 400)

    }
    console.log(customError.name + "--" + customError.message, customError.status)
    res.status(customError.status).json({
        success: false,
        message: err.message
    })
}


module.exports = { customErrorHandler }