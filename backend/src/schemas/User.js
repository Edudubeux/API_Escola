import * as Yup from 'yup';
import sanitize from '../config/sanitize';

export default {
  store: {
    body: Yup.object().shape({
      name: Yup.string().transform(sanitize).required(),
      email: Yup.string().transform(sanitize).required().email(),
      password: Yup.string().transform(sanitize).min(6).max(14).required(),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().transform(sanitize).required(),
      email: Yup.string().transform(sanitize).email().required(),
      old_password: Yup.string().transform(sanitize).min(6).max(14).nullable(),
      new_password: Yup.string().transform(sanitize).min(6).max(14).nullable().when('old_password', (old_password, field) => {
        return old_password ? field.required() : field;
      }),
      confirm_password: Yup.string().transform(sanitize).min(6).max(14).nullable().when('new_password', (new_password, field) => {
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

