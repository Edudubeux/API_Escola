import User from "../models/User"

export default {
  find: async data => {
    const user = await User.findOne({ where: { email: data.email }})
    return user;
  }
}
