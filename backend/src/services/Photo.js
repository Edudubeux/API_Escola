import Photo from "../models/Photo";

export default {
	find: async student_id => {
		const photo = await Photo.findOne({
			where: {
				student_id
			}
		});
		return photo;
	},

	store: data => {
		return Photo.create(data)
	},

	delete: async student_id => {
		const photo = await Photo.findOne({ where: { student_id } })

		if (!photo) {
			throw "You don't have any photo!"
		}

		await photo.destroy();
	}
}
