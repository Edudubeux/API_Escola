import StudentService from '../services/Student';

class StudentController {
  async store(req, res) {
    try {
      console.log(req.data);
      const newStudent = await StudentService.store(req.data);
      return res.json(newStudent);
    } catch(error) {
      return res.status(400).json({ error: "REQUIRED_FIELDS" })
    }
  }

  // console.log(method, 'OLA METHOD');
  // console.log(filter, 'OLA FILTER');

  async index(req, res) {
    try {
      const method = req.filter && req.filter.id ? 'find' : 'index';
      const filter = req.filter && req.filter.id ? req.filter.id : req.userId;

      const students = await StudentService[method](filter);
      return res.json(students)
    } catch(error) {
      return res.status(400).json({ error: "REQUIRED_FIELDS" });
    };

  }

  async update(req, res) {
    try{
      const updatedStudent = await StudentService.update({ data: req.data, filter: req.filter, userId: req.userId });
      return res.json(updatedStudent);
    } catch(error) {
      res.status(400).json({ error: "REQUIRED_FIELDS" })
    }
  }

  async destroy(req, res) {
    try{
      await StudentService.destroy({ data: req.data, filter: req.filter, userId: req.userId })
      return res.json({ message: "Student deleted." });
    } catch(error) {
      res.status(400).json({ error: "REQUIRED_FIELDS" })
    }
  }
}

export default new StudentController();
