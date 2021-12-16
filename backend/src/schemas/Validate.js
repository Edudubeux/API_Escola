const Validate = schema => {
  return async (req, res, next) => {
    try {
      req.data = Object.keys(req.body).length ? await schema.body.validate(req.body) : null;
      req.filter = Object.keys(req.params).length ? await schema.params.validate(req.params) : null;
      req.filter = Object.keys(req.query).length ? {
        ...req.filter,
        ...await schema.params.validate(req.query)
      } : null;
      return next();
    } catch (error) {
      res.status(401).json({ error: "Validation failed." })
    }
  }
}

export default Validate;
