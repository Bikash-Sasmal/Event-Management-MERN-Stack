const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth'); 
const {getTickets, updateTicket } = require('../controllers/ticketController');


router.get('/gettickets', authenticate, getTickets);
router.put('/updateticket/:ticketId', authenticate, updateTicket);

module.exports = router;
