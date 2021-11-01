import User from "../models/User"

export default {
  store: async (email) => {
    const user = await User.findOne({ where: { email,}})
    return user;
  }
}
