import Student from "../models/Student";
import Photo from '../models/Photo';
import User from '../models/User';

const store = async (data, user_id) => {
  try {
    const emailValidate = await Student.findOne({ where: { email: data.email }});

    if (emailValidate) {
      throw 'This email already exists.';
    }
    const newStudent = await Student.create({ user_id, ...data });

    return newStudent;
  } catch (error) {
    throw new Error(error);
  }
};

const find = async (filter, user_id) => {
  try {
    const student = await Student.findOne({
      where: {
		id: filter.id,
		user_id
	}
    });

	if(!student){
		throw "Student not found!";
	}

    return student;
  } catch (error) {
    throw new Error(error);
  }
};

const index = async user_id => {
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
        user_id
      },
    });
    return students;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (data, filter, user_id) => {
  try {
    const student = await Student.findOne({
		where: {
			id: filter.id,
			user_id
		}
	});

    if (!student) {
      throw "Student not found!"
    }

    const updatedStudent = await student.update(data);

    return updatedStudent;

  } catch (error) {
    throw new Error(error);
  }
};

const destroy = async (filter, user_id) => {
  try {
    const student = await Student.findOne({
		where: {
			id: filter.id,
			user_id
		}
	});

    if (!student) {
      throw "Student not found!"
    }

    await student.destroy();
  } catch (error) {
    throw new Error(error)
  }
};

export default {
  store,
  index,
  update,
  destroy,
  find
}
