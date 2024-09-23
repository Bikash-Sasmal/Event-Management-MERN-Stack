const express = require('express');
const router = express.Router();
const {authenticate, isAttendee} = require('../middleware/auth');
const { registerUser, loginUser, updateUserProfile, deleteUserAccount, getUserProfile} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/updateprofile',authenticate, updateUserProfile);
router.delete('/deleteprofile',authenticate, deleteUserAccount);
router.get('/profile', authenticate, getUserProfile);

router.get("/test", authenticate, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Tests"
    })
});
router.get("/attendee", authenticate, isAttendee, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Attendee"
    })
});

module.exports = router;
