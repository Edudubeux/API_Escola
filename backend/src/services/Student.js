import Student from "../models/Student";
import Photo from '../models/Photo';
import User from '../models/User';

export default {
	store: async (data, user_id) => {
		const emailValidate = await Student.findOne({
			attributes: ['email'],
			where: {
				email: data.email
			}
		});

		if (emailValidate) {
			throw 'This email already exists.';
		}
		const newStudent = await Student.create({ user_id, ...data });

		return newStudent;
	},

	find: async (filter, user_id) => {
		const student = await Student.findOne({
			attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
			where: {
				id: filter.id,
				user_id
			}
		});

		if (!student) {
			throw "Student not found!";
		}

		return student;
	},

	index: async user_id => {
		const students = await Student.findAll({
			attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
			order: [['id', 'DESC']],
			include: [{
				model: Photo,
				as: 'photos',
				attributes: ['file_name'],
			}, {
				model: User,
				as: 'user',
				attributes: ['id'],
			}],
			where: {
				user_id
			},
		});
		return students;
	},

	update: async (data, filter, user_id) => {
		const student = await Student.update(data, {
			where: {
				id: filter.id,
				user_id
			},
		});

		if (!student) {
			throw "Student not found!"
		}

		return student;
	},

	destroy: async (filter, user_id) => {
		const student = await Student.destroy({
			where: {
				id: filter.id,
				user_id
			}
		});

		if (!student) {
			throw "Student not found!"
		}
	}
}
