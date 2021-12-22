import Photo from "../models/Photo";

export default {
  store: data => {
    return Photo.create(data)
  }
}
