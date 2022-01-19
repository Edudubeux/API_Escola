import User from "../models/User"

export default {
	store: async data => {
		const user = await User.findOne({
			attributes: ['email'],
			where: {
				email: data.email,
			}
		})
		if (user) {
			throw 'This email already exists.'
		}

		await User.create(data);
		return;
	},
	index: async userId => {
		const user = await User.findOne({
			attributes: ['name', 'email'],
			where: {
				id: userId
			}
		});
		if (!user) {
			throw "This user doesn't exists."
		};
		return user;
	},
	update: async (data, userId) => {
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
			return userUpdated;
		};

		if (!(await user.checkPassword(data.old_password))) {
			throw 'Invalid password.'
		}

		userUpdated = await user.update(data)

		return userUpdated;
	},
	destroy: async userId => {
		const user = await User.destroy({
			attributes: ['name', 'email'],
			where: {
				id: userId
			}
		});

		if (!user) {
			throw "User not found!"
		};

		return;
	}
}
