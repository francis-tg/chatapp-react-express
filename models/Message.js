const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    incoming_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
         ref:"User"
    },
    outgoing_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    message: {
        type: String,
        require:true
    },
    type: {
        type: String,
        default:"chat"
    }
})
const Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;