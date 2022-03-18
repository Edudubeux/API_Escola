// const Validate = schema => {
//   return async (req, res, next) => {
//       try {
//         Object.keys(schema).forEach(key => {
//           let responseKey = 'data';

//           if (['params', 'query'].includes(key)) {
//             responseKey = 'filter'          
//           }

//           try {
//           req[responseKey] = schema[key].validateSync(schema[key])
//           } catch (error) {
//             throw error;
//           }
//         });

//         return next();
//       } catch (error) {
//         res.status(401).json({ error: error.message })
//       }
//   }
// }

// export default Validate;


const Validate = schema => {
  return async (req, res, next) => {
    try {
      req.data = Object.keys(req.body).length ? await schema.body.validate(req.body) : null;
      req.filter = Object.keys(req.params).length ? await schema.params.validate(req.params) : null;
      req.filter = Object.keys(req.query).length ? {
        ...req.filter,
        ...await schema.params.validate(req.query)
      } : req.filter;
      return next();
    } catch (error) {
      res.status(401).json({ error: "Validation failed" })
    }
  }
}

export default Validate;
