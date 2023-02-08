const { ValidationError } = require('../utils/errorList')

const middleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);

        const valid = error == null;
            if (valid) {
                next()
            } else {
                throw new ValidationError(
                    `Validation error in ${error.details[0].message}. Please try again`
                )
        }
    }
}

module.exports = {
    middleware
}