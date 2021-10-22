import * as Yup from 'yup';

export default {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().max(255),
      email: Yup.string().required().email(),
      password: Yup.string().min(6).max(14).required(),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().max(255).required(),
      email: Yup.string().max(255).email().required(),
      old_password: Yup.string().min(6).max(14),
      new_password: Yup.string().min(6).max(14).when('old_password', (old_password, field) => {
        return old_password ? field.required() : field;
      }),
      confirm_password: Yup.string().min(6).max(14).when('new_password', (new_password, field) => {
        return new_password ? field.required().oneOf([new_password]) : field;
      }
        //   is: true,
        //   then: Yup.string().required().oneOf([Yup.ref('new_password')]),
        //   otherwise: () => { throw new Error('Both passwords must be the same.') }
        // }Yup.string().length(0)

      )
    }),
    params: Yup.object().shape({
      id: Yup.number().required()
    }),
  },
  destroy: {
    params: Yup.object().shape({
      id: Yup.number().required()
    })
  }
}

