const Ticket = require('../models/Ticket')

async function createTicket(req,res){
    try{
const {title, description, affectedDevice, email, contactNumber, severity, supportingLink, isApproved, status}=req.body
const newTicket = await Ticket.create({
    title,
    description,
    affectedDevice,
    email,
    contactNumber,
    severity,
    supportingLink,
    isApproved,
    status,
    author: req.user._id
})
res.status(201).json(newTicket)
}catch(err){
  console.log(err)
}
}

async function getAllTickets(req,res){
    try {
    const allTickets = await Ticket.find().populate('author')
    res.status(200).json(allTickets)
    }catch(err){
    console.log(err)
    }
}

async function getOneTicket(req,res){
    try{
   const oneTicket= await Ticket.findById(req.params.ticketId).populate('author')
   if(!oneTicket){
     return res.status(404).json({message:'Ticket Not Found.'})
   }
   res.status(200).json({ticket:oneTicket})
    }catch(err){
   console.log(err)
    }
}

async function updateOneTicket(req,res){
try{
const foundTicket = await Ticket.findById(req.params.ticketId)

if(!foundTicket){
    return res.status(404).json({message:'Ticket Not Found.'})
}

if(!foundTicket.author.equals(req.user._id)){
    return res.status(403).json({message:'You Are Not Permitted to Modify This Ticket'})
}

const updatedTicket = await Ticket.findByIdAndUpdate(req.params.ticketId,{
    title: req.body.title,
    description: req.body.description,
    affectedDevice: req.body.affectedDevice,
    email: req.body.emal,
    contactNumber: req.body.contactNumber,
    severity: req.body.severity,
    supportingLink: req.body.supportingLink,
    isApproved: req.body.isApproved,
    status: req.body.status
},{returnDocument: 'after',runValidators:true})
 res.status(200).json(updatedTicket)
}catch(err){
console.log(err)
}
}

async function deleteOneTicket(req,res){
    try{
        const foundTicket = await Ticket.findById(req.params.ticketId)

        if(!foundTicket){
            return res.status(404).json({message:'Ticket Not Found.'})
        }

        if(!foundTicket.author.equals(req.user._id)){
            return res.status(403).json({message:'You Are Not Permitted to Delete This Ticket.'})
        }

        const deletedTicket = await Ticket.findByIdAndDelete(req.params.ticketId)

        res.sendStatus(204)
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    getOneTicket,
    updateOneTicket,
    deleteOneTicket
}

// comment for update purposes