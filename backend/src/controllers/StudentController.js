import StudentService from '../services/Student';

class StudentController {
  async store(req, res) {
    try{
      const newStudent = await StudentService.store({ data: req.data, userId: req.userId });
      return res.json(newStudent);
    } catch(error) {
      return res.status(400).json({ error: "REQUIRED_FIELDS" })
    }
  }

  async index(req, res) {
    try{
      const students = await StudentService.index({ data: req.data, userId: req.userId });
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
