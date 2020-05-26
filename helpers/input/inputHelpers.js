const bcrypt = require("bcryptjs");

validateUserInput = (email, password) => {
    return email && password
}

compareInputs = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { validateUserInput, compareInputs }