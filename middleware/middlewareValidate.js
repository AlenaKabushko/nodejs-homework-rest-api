const middleware = (schema, property) => {
  return (req, res, next) => {

    const { error } = schema.validate(req[property]);

    const valid = error == null;
      if (valid) {
      next();
    } else {
      res.status(400).json({ "message": "Validation error.  Please try again" })
    }
  }
}

module.exports = {
    middleware
}