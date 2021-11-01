import Photo from "../models/Photo";

export default {
  store: async ( originalname, filename, student_id ) => {
    const photo = await Photo.create({
      original_name: originalname,
      file_name: filename,
      student_id
    })

    return photo;
  }
}
