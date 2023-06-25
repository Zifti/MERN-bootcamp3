const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: { type: String, enum: ["user", "admin"], default: "user" },
  verified: { type: Boolean, default: false}
});


module.exports = mongoose.model("User", UserSchema);
