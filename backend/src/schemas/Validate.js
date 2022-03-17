const Validate = schema => {
  return async (req, res, next) => {
      try {
        Object.keys(schema).forEach(key => {
          let responseKey = 'data';
  
          if (['params', 'query'].includes(key)) {
            responseKey = 'filter'          
          }
  
          try {
            req[responseKey] = schema[key].validateSync(schema[key])
          } catch (error) {
            throw error;
          }
        });

        return next();
      } catch (error) {
        res.status(401).json({ error: "Validation failed" })
      }
  }
}

export default Validate;
