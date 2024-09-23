const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { authenticate } = require('../middleware/auth');

router.post('/contactSubmit', authenticate, contactController.submitContact);
router.get('/messages', authenticate, contactController.getContacts);

module.exports = router;
