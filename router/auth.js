const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const auth = async (req, res) => {
    const SECRET_KEY = "my_secret_key";
    console.log(req);
    if (!req?.cookies?.Token) {
        res.send({
            message: "no user signed in"
        })
        return;
    }
    jwt.verify(req.cookies.Token, SECRET_KEY, async function (err, decodedData) {
        if (!err) {
            req.body.token = decodedData;
            await Users.findOne({ _id: decodedData.id }, 'firstName lastName email _id')
                .then((data) => {
                    const userData = data;
                    res.status(200).send({ data: userData });
                })
                .catch((err) => {
                    res.status(200).send({ message: 'error while getting data ==>' + err });
                    return;
                })
            return;
        } else res.status(401).send({ message: 'error while getting token' });
    });
}

module.exports = auth;