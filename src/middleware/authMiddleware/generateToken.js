function generateAccessToken (user) {
    const expiresIn = 60 * 60 * 1
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: expiresIn })
}

export default generateAccessToken