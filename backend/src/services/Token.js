import User from "../models/User"

export default {
  find: async email => {
    const user = await User.findOne({ where: { email }})
    return user;
  }
}
