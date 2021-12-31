import * as Yup from 'yup';

export default{
	store: {
		body: Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required()
		})
	}
}
