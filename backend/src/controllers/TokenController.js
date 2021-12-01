import jwt from 'jsonwebtoken';
import Token from '../services/Token';

class TokenController {
  async store(req, res) {
    const { email , password  } = req.body;

    if(!email || !password) {
      res.status(401).json({ error: 'Invalid passoword or email .'})
    }

    const user = await Token.store(email);

    if(!user) {
      res.status(400).json({ error: "This user doesn't exists ." })
    }

    if(!(await user.checkPassword(password))){
      res.status(400).json({ error: 'Invalid password.'})
    }

    const { id } = user;

    const token = jwt.sign({ id, email, }, 'admin', {
      expiresIn: '7d',
    });

    return res.json({ token, });
  }
}

export default new TokenController();
