const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    nom: String,
    password: {
        type: String,
        require:true
    },
    image: {
        type: String,
        require: false,
        default:"https://img.freepik.com/vecteurs-libre/jeune-bel-homme-isole-dans-poses-differentes-fond-blanc-illustration_632498-859.jpg?w=740&t=st=1684674004~exp=1684674604~hmac=07cde193db5fa971474359251f5da5576f170a688822690a2cc1bc1a4a9345b6"
    },
    tel: {
        type:String
    },
    email: {
        type: String,
        unique:true
    }
})
const User = mongoose.model("User", UserSchema)
module.exports = User