import * as Yup from 'yup';
import sanitize from '../config/sanitize';

export default {
  store: {
    body:
      Yup.object().shape({
        name: Yup.string().transform(sanitize).required(),
        surname: Yup.string().transform(sanitize).required(),
        email: Yup.string().transform(sanitize).required().email(),
        age: Yup.number().min(1).required().max(100),
        weight: Yup.number().required().min(0).max(120),
        height: Yup.number().required().min(0).max(2.10),
      }),
  },
  find : {
    params: Yup.object().shape({
      id: Yup.number().required(),
    })
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().transform(sanitize),
      surname: Yup.string().transform(sanitize),
      email: Yup.string().transform(sanitize).email(),
      age: Yup.number().min(1),
      weight: Yup.number().min(0),
      height: Yup.number().min(0),
    }),
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
  destroy: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
};
