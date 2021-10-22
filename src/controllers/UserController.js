import User from '../services/User';

class UserController {
  async store(req, res) {
    try{
      const newUser = await User.store({ data: req.data });
      return res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message})
    }
  }

  async index(req, res) {
    try{
      const user = await User.index({ userId: req.userId})
      return res.json(user);
    } catch(error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try{
      const updatedUser = await User.update({ data: req.data, userId: req.userId })
      res.json(updatedUser);
    } catch(error) {
      res.status(400).json({ error: error.message })
    }
  }

  async destroy(req, res) {
    const deleteUser = await User.destroy({ userId: req.userId })

    return res.json({ msg: 'User deleted'});
  }
}

export default new UserController();
