import jwt from 'jsonwebtoken';

import User from '../models/User';

export default async (req, res, next) => {
  const { Authorization } = (req.headers);

  if(!Authorization) {
    res.status(400).json({ error: 'Login required'})
  }

  const [, token ] = await Authorization.split(' ');

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
