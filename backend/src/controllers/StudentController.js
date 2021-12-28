import StudentService from '../services/Student';

class StudentController {
  async store(req, res) {
    try {
      const userId = req.userId
      const newStudent = await StudentService.store({ data: req.data, userId});
      return res.json(newStudent);
    } catch(error) {
      return res.status(400).json({ error: "REQUIRED_FIELDS" })
    };
  }

  async index(req, res) {
    try {
      const students = await StudentService.index({ userId: req.userId});

      students.forEach( student => {
         if (!student.photos) {
            student.photos.push({file_name: "/Users/eduardodubeux/Documents/Programação/Escola/backend/uploads/user.jpeg"});
         };
         return students;
      });
      return res.json(students)
    } catch(error) {
      return res.status(400).json({ error: "REQUIRED_FIELDS" });
    };
  }

  async find(req, res) {
    try {
      const student = await StudentService.find({ filter: req.filter, });

      if(!student){
        return res.status(400).json({ error: "Student not found!" })
      }

      if (req.userId !== student.user_id) {
        return res.status(400).json({ error: "Student not found!" })
      }

      return res.json(student)
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
    };
  }

  async destroy(req, res) {
    try{
      await StudentService.destroy({ filter: req.filter })
      return res.json({ message: "Student deleted." });
    } catch(error) {
      res.status(400).json({ error: "REQUIRED_FIELDS" })
    };
  }
}

export default new StudentController();
