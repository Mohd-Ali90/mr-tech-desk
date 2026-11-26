const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    ticket:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Reply = mongoose.model('Reply',replySchema)

module.exports = Reply