import Student from "../models/Student";
import Photo from '../models/Photo';
import User from '../models/User';




const store = async req => {
  try {
    const user_id = req.userId;
    
    const emailValidate = await find({ email: req.data.email });
    
    if (emailValidate) {
      throw new Error('Email already exists.');
    }
    const newStudent = await Student.create({ user_id, ...req.data });
    
    return newStudent;
  } catch (error) {
    throw new Error(error);
  }
};

const find = async req => {
  try {
    console.log(req.filter);
    const { id } = req.filter;

    const student = await Student.findOne({
      where: { id, }
    });
    return student;
  } catch (error) {
    throw new Error(error);
  }
};

const index = async req => {
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
      },
    });
    return students;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (req) => {
  try {
    const { id } = req.filter;

    const student = await Student.findOne({ where: { id }});

    if (!student) {
      throw new Error("This student doesn't exists.");
    }

    const updatedStudent = await student.update(req.data);
    
    return updatedStudent;
    // const options = {
    //   changes: req.data,
    //   filter: id
    // };

    // const updatedStudent = Student.update({ options });
    
  } catch (error) {
    throw new Error(error);
  }
};

const destroy = async req => {
  try {
    const { id } = req.filter;

    const student = await Student.findOne({ id });

    if (!student) {
      throw new Error("This student doesn't exists. ")
    }

    await student.destroy();
  } catch (error) {
    throw new Error(error)
  }
}

export default {
  store,
  index,
  update,
  destroy,
  find
}
