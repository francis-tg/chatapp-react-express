const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const {protect} = require("../../config/auth")
module.exports = router

    .post("/sign-up", async(req, res) => {
        const { email, username, password } = req.body
        console.log(req.body)
        if (email&& username&& password) {
            const newUser = await new User({
                email, username, password: bcrypt.hashSync(password, 10)
            })
            newUser.save().then((user) => {
                const payload = {
                    username: user.username,
                    email: user.email,
                    avatar: user.image,
                    tel: user.tel
                }
                const token = jwt.sign(payload,"Su44mWCEQYfhNuQ6",{expiresIn:"2d"})
                res.status(201).json(token)
            }).catch((err)=>console.log(err))
        }
    })
    .post("/sign-in", async(req, res) => {
        const { email, password } = req.body
         console.log(req.body)
        if (email && password) {
            await User.findOne({ email }).then((user) => {
                if (!user) return res.status(401).send("User not found")
                if (bcrypt.compare(password, user.password)) {
                     const payload = {
                    username: user.username,
                    email: user.email,
                    avatar: user.image,
                    tel: user.tel
                }
                const token = jwt.sign(payload,"Su44mWCEQYfhNuQ6",{expiresIn:"2d"})
                    return res.status(200).json(token)
                }
            })
        }
    
    })
.get('/',protect(), async(req, res) => {
    const users = await User.find({ _id: { $not: {$eq:req.user._id} } });
    res.status(200).json(users)
})
    .post("/protect", protect(), (req, res) => {
    return res.status(200).json(req.user)
})