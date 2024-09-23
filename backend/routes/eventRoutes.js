const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth');

const { createEvent, getEvents, getEventDetails, updateEvent, deleteEvent, attendEvent, searchEvents, getEventStats} = require('../controllers/eventController');

router.post('/create',authenticate, createEvent);
router.get('/all', authenticate, getEvents);
router.get('/details/:eventId', authenticate, getEventDetails);
router.put('/update/:eventId', authenticate, updateEvent);
router.delete('/delete/:eventId', authenticate, deleteEvent);

router.post('/attend/:eventId', authenticate, attendEvent);
router.get('/search', searchEvents);
router.get('/dashboard/:eventId', authenticate, getEventStats);



module.exports = router;
