const jwt = require("jsonwebtoken");
const Users = require('../models/User');
const {
    stringToHash,
} = require("bcrypt-inzi");

const signUp = async (req, res) => {

    let { firstName, lastName, email, password } = req.body;
    const SECRET_KEY = "my_secret_key";

    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ message: 'data is missing' });
        return;
    }

    Users.findOne({ email }, (err, user) => {
        if (!err) {
            if (user) { // user already exist
                res.status(400).send({ message: "user already exist. Please try a different email" });
                return;
            } else { // user not already exist

                // bcrypt hash
                stringToHash(password).then(hashString => {

                    Users.create({
                        firstName,
                        lastName,
                        email,
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                var token = jwt.sign({
                                    id: result._id,
                                }, SECRET_KEY)
                                res.cookie('Token', token, {
                                    httpOnly: true
                                })
                                    .status(200)
                                    .send({
                                        firstName,
                                        lastName,
                                        email,
                                    });
                            } else {
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
};

module.exports = signUp;