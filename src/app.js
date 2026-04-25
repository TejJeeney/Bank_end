//app.js ke main kam
/* - server ko create karna
- middleware ko setup karna
- routes ko setup karna
*/

const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

const authRouter = require('./routes/auth.route.js')

app.use(express.json())  
app.use(cookieParser())

app.use('/api/auth', authRouter)

module.exports = app


