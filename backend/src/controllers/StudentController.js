import StudentService from '../services/Student';
import path from 'path';

class StudentController {
	async store(req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

			const newStudent = await StudentService.store(req.data, req.userId);
			return res.json(newStudent);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
	}

	async index(req, res) {
		try {
			const students = await StudentService.index(req.userId);

			const filePath = path.resolve(__dirname, '../', '../', '/uploads', '/user.jpeg')

			students.forEach(student => {
				if (!student.photos) {
					student.photos.push({ file_name: filePath });
				};
				return students;
			});

			return res.json(students)
		} catch (error) {
			return res.status(400).json({ error: error.message });
		};
	}

	async find(req, res) {
		try {
			const student = await StudentService.find(req.filter, req.userId);

			if (!student || req.userId !== student.user_id) {
				return res.status(400).json({ error: error.message })
			}

			return res.json(student)
		} catch (error) {
			return res.status(400).json({ error: error.message });
		};
	}

	async update(req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}
			const updatedStudent = await StudentService.update(req.data, req.filter, req.userId);
			return res.json(updatedStudent);
		} catch (error) {
			res.status(400).json({ error: error.message })
		};
	}

	async destroy(req, res) {
		try {
			await StudentService.destroy(req.filter, req.userId)
			return res.json({ message: "Student deleted." });
		} catch (error) {
			res.status(400).json({ error: error.message })
		};
	}
}

export default new StudentController();
