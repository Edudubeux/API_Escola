import User from "../models/User"

export default {
  store: async (req) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.data.email,
        }
      })
      if (user) {
        throw new Error('This email already exists.')
      }

      const userCreated = await User.create(req.data);

      return userCreated;
    } catch (error) {
      throw new Error(error)
    }
  },
  index: async (req) => {
    try {
      const user = await User.findByPk(req.userId)
      console.log(req.userId)
      if (!user) {
        throw new Error("This user doesn't exists.")
      }
      return user;
    } catch (error) {
      throw new Error(error)
    }
  },
  update: async (req) => {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        throw new Error("This user doesn't exists.")
      }

      if (!(await user.checkPassword(req.data.old_password))) {
        throw new Error('Invalid password.')
      }

      await user.update({
        name: req.data.name,
        email: req.data.email,
        password: req.data.new_password
      });

      return user;
    } catch (error) {
      throw new Error(error)
    }
  },
  destroy: async (req) => {
    const user = await User.findByPk(req.userId);

    if(!user) {
      throw new Error("This user doesn't exists.")
    }

    await user.destroy();
  }
}
