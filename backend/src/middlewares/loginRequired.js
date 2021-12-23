import jwt from 'jsonwebtoken';

import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = (req.headers);

  if(!authorization) {
    return res.status(400).json({ error: 'Login required'});
  }

  const [, token ] = await authorization.split(' ');

  try {
    const data = await jwt.verify(token, 'admin');
    const { id, email } = data;

    const user = await User.findByPk(id)

    if(!user) {
      return res.status(401).json({ error: "Invalid user." })
    }

    req.email = email;
    req.userId = id;

    return next();
  } catch (e){
    return res.status(400).json({
      error: 'Invalid or expired token.'
    })
  }
};
