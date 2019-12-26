const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;


let UserSchema = new Schema(
    {
    	// for auth
        username: {type: String, max: 100},
        password: {type: String},

        // personal info
        name : {type: String},
        phone : {type: String},
        college : {type: String},

        // registration details
        events : [{type : Schema.Types.ObjectId, ref: "Event"}],
        accomodation : {type : Schema.Types.ObjectId, ref: "Accomodation"}
    }
);

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);