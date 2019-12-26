const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = Schema(
	{
		name : {type : String},
		price : {type : String}
	}
);

module.exports = mongoose.model("Event", EventSchema);