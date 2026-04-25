const UserModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

async function userRegister(req, res) {
    const { email, password, name } = req.body

    const ifExists = await UserModel.findOne({
        email: email
    })

    if (ifExists) {
        return res.status(422)
            .json({
                status: "fail",
                message: "User already exists with this email"
            })
    }

    const user = await UserModel.create({
        email,
        password,
        name
    })

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, { expiresIn: '3d' })

    res.cookie('token', token) // yahn pr humne cookie set krdiya hai jisme token hoga, jise client side pr access kr skte hai aur use kr skte hai authentication ke liye

    res.status(201)
        .json({
            User: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })
}

async function userLogin(req, res) {

    const { email, name, password } = req.body

    const user = await UserModel.findOne({ email }).select("+password") // yahn pr humne password ko explicitly select kiya hai kyuki user model me password field ko select:false kr diya hai, jiska matlab hai ki by default password field query results me include nahi hota, to login ke case me hume password ki zarurat hoti hai isliye humne .select("+password") use kiya hai taki password field bhi query results me include ho jaye
    
    if (!user) {
        return res.status(404)
        .json({
            status: "fail",
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await user.isPasswordCorrect(password) 

    if (!isValidPassword) {
        return res.status(404)
            .json({
                status: "failed",
                message: "Invalid email or password"
            })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })

    res.cookie('token', token)

    res.status(200)
        .json({
            User: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })
}

module.exports = {
    userRegister,
    userLogin
}