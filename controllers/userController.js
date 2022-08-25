const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginValidade, registerValidade} = require('./validade');

const userController = {
    register: async function (req, res) {

        const {error} = registerValidade(req.body)
        if(error){return res.status(400).send(error.message)}

        const selectedUser = await User.findOne({ email: req.body.email })
        if (selectedUser) return res.status(400).json({ msg: "Email already exists" });

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        });

        try {
            const savedUser = await user.save()
            res.send(savedUser);
        } catch (error) {
            res.status(400).json({ error });
        }
    },




    login: async function (req, res) {

        const {error} = loginValidade(req.body)
        if(error){return res.status(400).send(error.message)}
        
        const selectedUser = await User.findOne({ email: req.body.email })
        if (!selectedUser) return res.status(400).json({ msg: "Email or password incorrect" });
        console.log(selectedUser)

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) return res.status(400).json({ msg: "Email or password incorrect" });
        console.log(passwordAndUserMatch)

        const token = jwt.sign({_id: selectedUser._id, admin: selectedUser.admin}, process.env.TOKEN_SECRET);
        res.header('authorization-token', token);

        return res.status(200).json({ msg: "User Logged" });

    }
}


module.exports = userController