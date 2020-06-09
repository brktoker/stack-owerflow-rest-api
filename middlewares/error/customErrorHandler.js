const CustomError = require("../../helpers/errors/CustomError")
const customErrorHandler = (err, req, res, next) => {
    let customError = err
     //console.log(err)
    if (customError.name === "ValidationError") {
        customError = new CustomError(err.message, 400)
    }
    if (customError.name === "SyntaxError") {
        customError = new CustomError(err.message, 400)
    }
    if(customError.name === "CastError"){
        customError = new CustomError("Please provide a valid ID",400)
    }
    if(customError.code === 11000){
        customError = new CustomError("Duplicate key error, please check your input",400)
    }
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    })
}


module.exports = { customErrorHandler }