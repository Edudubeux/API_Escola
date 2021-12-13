import Student from "../models/Student";
import Photo from '../models/Photo';
import User from '../models/User';

export default {
  store: async (req) => {
    try {
      const user_id = req.userId;

      const emailValidate = await Student.findOne({ where: { email: req.data.email } })

      if (emailValidate) {
        throw new Error('Email already exists.');
      }
      const newStudent = await Student.create({ user_id, ...req.data });

      return newStudent;
    } catch (error) {
      throw new Error(error);
    }
  },
  index: async (req) => {
    try {
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
          user_id: req.userId
        }
      });

      return students;
    } catch (error) {
      throw new Error(error);
    }
  },
  update: async (req) => {
    try {
      const { id } = req.filter;

      const student = await Student.findByPk(id);

      if (!student) {
        throw new Error("This student doesn't exists.");
      }

      const updatedStudent = await student.update(req.data);

      return updatedStudent;

    } catch (error) {
      throw new Error(error);
    }
  },
  destroy: async (req) => {
    try{
      const { id } = req.filter;

      const student = await Student.findByPk(id);

      if (!student) {
        throw new Error("This student doesn't exists. ")
      }

      await student.destroy();
    } catch(error) {
      throw new Error(error)
    }
  }
}
