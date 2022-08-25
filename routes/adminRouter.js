const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');

router.get('/', auth, (req, res) => {
    if(req.user.admin){
    res.status(200).json({ msg: "Esse dado só deve ser visto pelo admin"})
    } else {
        res.status(401).json({ msg: "Not Admin: Acess Denied"})
    }

});

module.exports = router;