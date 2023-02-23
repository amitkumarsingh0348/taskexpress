/**
 * Module dependencies.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SALT_WORK_FACTOR } = require("../services/constant");
const Schema = mongoose.Schema;
// const oAuthTypes = ["google", "facebook"];

/**
 * User Schema
 */

const user = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, unique: true, trim: true, lowercase: true },
    password: { type: String, select: true },
    status: { type: String, default: "Active" },
    otp: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);

// Pre save Hook
user.pre("save", function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)

  if (
    this.isModified("password") ||
    (this.isNew &&
      (this.socialMediaId === undefined || this.socialMediaId === ""))
  ) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (hashErr, hash) => {
        if (hashErr) {
          return next(hashErr);
        }
        // override the cleartext password with the hashed one
        user.password = hash;
        //  user.email= user.email.toLocaleLowerCase().replace(/\s+/gm, "")
        next();
      });
    });
  } else {
    return next();
  }
});

const User = mongoose.model("User", user);

module.exports = User;
