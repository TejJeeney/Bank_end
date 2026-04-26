const mongoose  = require('mongoose')

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User must be associated with an account']
    },
    status: {
        enum: {
            values: ['ACTIVE', 'FROZEN', 'CLOSED'],
            message: 'Status must be either ACTIVE, FROZEN, or CLOSED'
        }
    }, 
    currency: {
        type: String,
        required: [true, 'Currency is required'],
        default: "INR"
    }
}, {
    timestamps: true
})

export const accountModel = mongoose.model('account', accountSchema)