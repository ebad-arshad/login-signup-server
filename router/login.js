const jwt = require("jsonwebtoken");
const Users = require('../models/User');
const {
    varifyHash,
} = require("bcrypt-inzi");

const login = async (req, res) => {
    let { email, password } = req.body;
    const SECRET_KEY = "my_secret_key";

    if (!email || !password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user exist
    Users.findOne(
        { email },
        (err, data) => {
            if (!err) {
                if (data) { // user found
                    varifyHash(password, data.password).then(isMatched => {

                        if (isMatched) {
                            var token = jwt.sign({
                                id: data._id,
                            }, SECRET_KEY);
                            res.cookie('Token', token, {
                                httpOnly: true,
                            })
                                .status(200)
                                .send({
                                    message: "login successful",
                                    profile: {
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email,
                                        _id: data._id
                                    }
                                });
                            return;
                        } else {
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
};

module.exports = login;