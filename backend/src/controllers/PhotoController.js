import multer from "multer";
import fs from 'fs';
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

				const photo = await Photo.find(id)

				if(photo) {
					return res.status(400).json({
						error: "You already have a photo!"
					});
				}

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
				return res.status(400).json({ error })
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

			try{
				const { id } = req.params;

				const file = req.file;

				if (!file) {
					return res.status(400).json({
						error: "Please, select a photo!"
					});
				}

				const photo = await Photo.find(id);

				if(!photo) {
					const mestre = req.file.path
					fs.unlink(`${mestre}`, function (error) {
						if(error) throw error;
					});
					return res.status(400).json({ error: "You don't have any photo!" })
				};

				const path = photo.dataValues.file_name;

				fs.unlink(`${path}`, function (error) {
					if(error) throw error;
				});

				await Photo.delete(id)

				const data = {
					original_name: file.filename,
					file_name: file.path,
					student_id: id
				};

				const response = await Photo.store(data);

				return res.json(response);
			} catch (error){
				res.status(400).json({ error: error.message })
			}
		});
	}

	async delete(req, res) {
		try {
			const { id } = req.params;

			const response = await Photo.delete(id);

			return res.json(response);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
	};
}

export default new PhotoController();
