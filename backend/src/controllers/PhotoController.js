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
        const file = req.file;

        if (!file) {
          return res.status(400).json({
            err
          });
        }
        
        console.log(path, "OLA PATH");

        const data = {
          original_name: file.filename,
          file_name: file.path,
          student_id: req.params.id
        };

        console.log(data);

        const response = await Photo.store(data);

        return res.json(response);
      } catch (error) {
        return res.status(400).json({
          error: "This student doesn't exists."
        });
      }
    });
  }

  // async find(req, res) {
  //   try {
  //     const photo = 
  //   } catch {

  //   }
  // }
}

export default new PhotoController();
