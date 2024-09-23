const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/auth'); 
const { createPoll, createDiscussion, votePoll, getEngagementDetails } = require('../controllers/engagementController');

router.post('/poll/:eventId', authenticate, createPoll);
router.post('/discussion/:eventId', authenticate, createDiscussion);
router.post('/vote', authenticate, votePoll);
router.get('/engagements/:eventId', authenticate, getEngagementDetails);

module.exports = router;
