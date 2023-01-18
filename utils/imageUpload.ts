import axios from "axios"

export const imageUpload = async (image: File) => {
  const formData = new FormData()

  formData.append("file", image)
  formData.append("upload_preset", "online-shop")
  formData.append("cloud_name", "mintoan")

  const res = await axios.post("https://api.cloudinary.com/v1_1/mintoan/upload", formData)
  return res
}
