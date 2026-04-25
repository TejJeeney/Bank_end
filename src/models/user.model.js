const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false 
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    }
},
    {
        timestamps: true
    })

UserSchema.pre('save', async function () {

    if (!this.isModified('password')) {
        return console.log("Password is not modified, skipping hashing")
    }

    // const hashedPassword = await bcrypt.hash(this.password, 10)
    // this.password = hashedPassword

    //OR

    this.password = await bcrypt.hash(this.password, 10)//
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// export const userModel = mongoose.model("user", UserSchema)
// OR 

const userModel = mongoose.model('User', UserSchema)
module.exports = userModel

