const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;


let UserSchema = new Schema(
    {
        username: {type: String, required: true, max: 100},
        password: {type: String, required: false}
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);