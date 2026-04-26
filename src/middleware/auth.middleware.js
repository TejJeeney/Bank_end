const userModel = require('../models/user.model.js')
const jwt = require('jsonwebtoken')



async function authMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] // yahn pr humne token ko cookies se access kiya hai, agar cookies me token nahi hai to hum headers se token ko access karne ki koshish karenge, jisme authorization header me token hoga jise "Bearer <token>" format me send kiya jata hai, to hum .split(" ")[1] use karenge taki hume token ka actual value mil jaye


    if (!token) {
        return res.status(401)
        .json({
            status: 'fail',
            message: 'Unauthorized access, token is missing'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //is step pe humpe user_id bhi milega which we can store in the user. 

        const user =await userModel.findById(decoded.userId) 

        req.user = user
        next()

    } catch (error) {
        return res.status(401)
        .json({
            status: 'fail',
            message: 'Unauthorized access, invalid token'
        })
        
    }
}