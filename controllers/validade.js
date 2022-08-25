const Joi = require('@hapi/joi');

const registerValidade = (data) => {

    const Schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(50)
    })

    return Schema.validate(data)

};

const loginValidade = (data) => {

    const Schema = Joi.object({
        email: Joi.string().required().min(3).max(50),
        password: Joi.string().required().min(6).max(50)
    })

    return Schema.validate(data)

};

module.exports.loginValidade = loginValidade;
module.exports.registerValidade = registerValidade;