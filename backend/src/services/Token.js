import User from "../models/User"

export default {
  find: data => {
    return User.findOne({
		where:{
			email: data.email
		},
	});
  }
}
