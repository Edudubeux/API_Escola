import multer from "multer";
import multerConfig from '../config/multerConfig';

import Photo from "../services/Photo";

const upload = multer(multerConfig).single('File')

class PhotoController {
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ errors: [err.code], })
      }
      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await Photo.store({ originalname, filename, student_id })

        return res.json(student_id, originalname, filename);
      } catch (e){
        return res.status(400).json({ error: "This student doesn't exists."})
      }
    });
  }
}

export default new PhotoController();
