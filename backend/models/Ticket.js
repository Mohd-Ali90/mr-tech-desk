const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50
    },
    description:{
        type:String,
        required: true,
      maxLength: 200
    },
    affectedDevice:{
        type: String,
        maxLength:50
    },
    email:{
        type: String,
        required:true
    },
    contactNumber:{
        type:Number,
        required: true
    },
    severity:{
        type: String,
        enum:['Low','Moderate','High'],
        default:'Low'
    },
    supportingLink:{
        type:String
    },
    isApproved:{
        type:Boolean
    },
    status:{
        type: String,
        enum:['Open','Closed'],
        default:'Open'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket