const logOut = async (req, res) => {
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }
    res.cookie('Token', '', {
        maxAge: 1,
        httpOnly: true
    });
    res.send({ message: "token expired" })
}

module.exports = logOut;