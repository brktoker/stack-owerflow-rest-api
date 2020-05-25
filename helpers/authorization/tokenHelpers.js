sendJwtToClient = (user, res) => {
    const token = user.generateJwtFromUser(user);
    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env

    res.status(200)
        .cookie('access_token', token, {
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 3600000), // cookie will be removed after 8 hours
            httpOnly: true,
            secure: NODE_ENV === "development" ? false : true // if development false https else production secure true https
        })
        .json({
            success: true,
            access_token: token,
            username: user.name,
            email: user.email
        })
}
isTokenIncluded = (req) => {

    return req.headers.authorization && req.headers.authorization.startsWith('Bearer:');
}
getAccessTokenFromHeaders = (req) => {
    const headers = req.headers.authorization
    const access_token = headers.split(" ")[1]
    return access_token;
}
module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeaders };