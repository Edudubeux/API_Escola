import jwt from 'jsonwebtoken';
import Token from '../services/Token';

class TokenController {
  async store(req, res) {
    const { email , password  } = req.body;

    const user = await Token.find(email);

    if(!user) {
      return res.status(400).json({ error: "Invalid password or email, try again later." });
    }

    if(!(await user.checkPassword(password))){
      return res.status(400).json({ error: 'Invalid password or email, try again later.'});
    }

    const { id } = user;

    const token = jwt.sign({ id, email, }, 'admin', {
      expiresIn: '7d',
    });

    return res.json({ token, });
  }
}

export default new TokenController();
