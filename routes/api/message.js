const router = require("express").Router()
const Message = require("../../models/Message")
const {protect} = require("../../config/auth")
module.exports = router
    .post("/add", protect(),async(req, res) => {
        const { outgoing_id, message } = req.body
        if (outgoing_id && message) {
            const newMsg = new Message({ outgoing_id, incoming_id: req.user._id, message })
            await newMsg.save().then(() => {
                return res.status(200).send("success")
            }).catch((err)=>console.log(err))
        }
    
    })
    .get('/:incoming_id',protect(), async(req, res) => {
        await Message.find({ outgoing_id: { $in: [req.user._id, req.params.incoming_id] }, incoming_id: { $in: [req.user._id, req.params.incoming_id] } }).populate("incoming_id", ["username", "image"]).populate("outgoing_id", ["username", "image"]).then((message) => {
            return res.status(200).json(message)
        }).catch((err)=>console.log(err))
        
        
    })