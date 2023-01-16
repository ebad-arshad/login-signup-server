const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;
