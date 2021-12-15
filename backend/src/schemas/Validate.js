const Validate = schema => {
  return async (req, res, next) => {
    try {
      // console.log(req.data, "OLA DATA");
      // console.log(req.params, "OLA PARAMS");
      req.data = Object.keys(req.body).length ? await schema.body.validate(req.body) : null;
      req.filter = Object.keys(req.params).length ? await schema.params.validate(req.params) : null;
      console.log( await schema.params.validate(req.params), req.filter)
      req.filter = Object.keys(req.query).length ? {
        ...req.filter,
        ...await schema.params.validate(req.query)
      } : null;
      console.log(req.filter);
      return next();
    } catch (error) {
      res.status(401).json({ error: "Validation failed." })
    }
  }
}

export default Validate;
