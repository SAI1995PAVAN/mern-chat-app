const mongoose = require('mongoose');
const bcrypt=require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
    isAdmin: {
        type: Boolean,
        default:false
    }
}, {
    timeStamps:true
})


userSchema.methods.matchPassword = async function (passwordGiven) {
   return await bcrypt.compare(passwordGiven,this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("User", userSchema);

module.exports = User

