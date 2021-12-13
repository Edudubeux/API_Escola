import * as Yup from 'yup';

export default {
  store: {
    body:
      Yup.object().shape({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        email: Yup.string().required().email(),
        age: Yup.number().required(),
        weight: Yup.number().required(),
        height: Yup.number().required(),
      }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string(),
      surname: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
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
