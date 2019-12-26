const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        trans_id : {type: String},
        status : {type: String},
        name : {type: String},
        email : {type: String},
        reg_event : {type: String},
        amount : {type: String}
    }
);

module.exports = mongoose.model("Transaction", TransactionSchema);