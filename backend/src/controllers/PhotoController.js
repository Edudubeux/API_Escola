import multer from "multer";
import multerConfig from "../config/multerConfig"

import Photo from "../services/Photo";

const upload = multer(multerConfig).single('file')

class PhotoController {
	async store(req, res) {
		return upload(req, res, async (err) => {
			if (err) {
				return res.status(400).json({ errors: [err.code], })
			}
			try {
				const { id } = req.params;

				const file = req.file;

				if (!file) {
					return res.status(400).json({
						error: "Please, select a photo!"
					});
				}

				await Photo.find(id)

				const data = {
					original_name: file.filename,
					file_name: file.path,
					student_id: id
				};

				const response = await Photo.store(data);

				return res.json(response);
			} catch (error) {
				return res.status(400).json({ error: error.message });
			}
		});
	}

	async find(req, res) {
		try{
			const { id } = req.params;

			const photo = await Photo.find(id);

			if(!photo){
				res.status(400).json({ error })
			}

			return photo;
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	};

	async update(req, res) {
		return upload(req, res, async (err) => {
			if (err) {
				return res.status(400).json({ errors: [err.code], })
			}
			try {
				console.log(file, "OLA FILE");
				const file = req.file;

				if (!file) {
					return res.status(400).json({
						err,
					});
				}

				const data = {
					original_name: file.filename,
					file_name: file.path,
					student_id: req.params.id
				};

				const response = await Photo.update(data);

				return res.json(response);
			} catch (error) {
				return res.status(400).json({ error: error.message });
			}
		});
	}

	async delete(req, res) {
		try {
			const { id } = req.params;

			const response = await Photo.delete(id)

			return res.json(response)
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
	};
}

export default new PhotoController();
