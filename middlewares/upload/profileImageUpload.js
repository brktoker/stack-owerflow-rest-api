const multer = require("multer")
const path = require("path")
const CustomerError = require("../../helpers/errors/CustomError")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.dirname(require.main.filename)// app.js root directory
        cb(null, path.join(rootDir, "public/uploads"))
    },
    filename: function (req, file, cb) {
        const fileType = file.mimetype.split("/")[1]
        req.savedProfileImage = "image_" + req.user.id + "." + fileType
        cb(null, req.savedProfileImage)
    }
})

const fileFilter = function (req, file, cb) {
    let allowedMimetype = ["image/jpg", "image/gif", "image/jpeg", "image/png"]
    if (!allowedMimetype.includes(file.mimetype)) {
        return cb(new CustomerError("Please provide a valid image file", 400), false)
    }

    return cb(null, true)
}

const profileImageUpload = multer({ storage, fileFilter })

module.exports = profileImageUpload