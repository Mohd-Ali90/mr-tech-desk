const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const ticketController = require('../controllers/ticket.controller')

router.post('/', verifyToken, ticketController.createTicket)

router.get('/', ticketController.getAllTickets)

router.get('/:ticketId', verifyToken , ticketController.getOneTicket)

router.put('/:ticketId', verifyToken , ticketController.updateOneTicket)

router.delete('/:ticketId', verifyToken, ticketController.deleteOneTicket)

router.post('/:ticketId/replies', verifyToken, ticketController.createOneReply)

module.exports = router