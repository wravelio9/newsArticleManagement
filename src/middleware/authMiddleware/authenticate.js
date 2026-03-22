function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).json({ message: "Token needed"})

    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    const secret = process.env.ACCESS_TOKEN

    try {
        const jwtDecode = jwt.verify(token, secret)
        if (typeof jwtDecode !== 'string') rseq.userData = jwtDecode
    } catch(err){
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()
}

export default authenticateToken