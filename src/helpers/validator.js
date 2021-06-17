const Joi = require('joi');

const validateSchema = () => {
    const schema = Joi.object({
        login: Joi.string().alphanum().min(3).max(30).required(),

        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/).required(),

        age: Joi.number().integer().min(4).max(130).required()
    });

    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details[0].path[0] === 'password' ?
                'Password must contain both numbers and letters' : error.details[0].message;
            res.status(400).json(
                {
                    message: errorMessage,
                    status: 400
                });
        }
        next();
    };
};

module.exports = validateSchema;
