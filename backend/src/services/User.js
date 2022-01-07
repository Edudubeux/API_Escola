import User from "../models/User"

export default {
	store: async data => {
		try {
			const user = await User.findOne({
				where: {
					email: data.email,
				}
			})
			if (user) {
				throw 'This email already exists.'
			}

			const userCreated = await User.create(data);

			return userCreated;
		} catch (error) {
			throw new Error(error)
		}
	},
	index: async userId => {
		try {
			const user = await User.findByPk(userId);
			if (!user) {
				throw "This user doesn't exists."
			};
			return user;
		} catch (error) {
			throw new Error(error)
		}
	},
	update: async (data, userId) => {
		try {
			let userUpdated
			const user = await User.findByPk(userId);

			if (!user) {
				throw "This user doesn't exists."
			};

			if (!data.old_password || !data.new_password || !data.confirm_password) {
				userUpdated = await user.update({
					name: data.name,
					email: data.email,
				})
				return;
			};

			if (!(await user.checkPassword(data.old_password))) {
				throw 'Invalid password.'
			}

			userUpdated = await user.update(data)

			return userUpdated;
		} catch (error) {
			throw new Error(error)
		}
	},
	destroy: async userId => {
		const user = await User.findByPk(userId);

		if (!user) {
			throw "User not found!"
		};

		await user.destroy();
	}
}
