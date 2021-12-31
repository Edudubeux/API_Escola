import User from '../services/User';

class UserController {
	async store(req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			};
			const newUser = await User.store(req.data);
			return res.json(newUser);
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	async index(req, res) {
		try {
			const user = await User.index(req.userId)
			return res.json(user);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
	}

	async update(req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			};

			const updatedUser = await User.update(req.data, req.userId)
			res.json(updatedUser);
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	async destroy(req, res) {
		const deletedUser = await User.destroy(req.userId)

		return deletedUser;
	}
}

export default new UserController();
