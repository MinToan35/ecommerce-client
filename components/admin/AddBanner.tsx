import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { IoMdImages } from "react-icons/io"
import { createBanner } from "../../redux/actions/bannerAction"
import { createAxios } from "../../utils/createInstance"
import { useSelector } from "react-redux"
import { IRootState } from "../../redux/interfaces"
import { AiOutlineReload } from "react-icons/ai"
interface Props {
  setRender: React.Dispatch<React.SetStateAction<any>>
}

const AddBanner: React.FC<Props> = ({ setRender }) => {
  const dispatch = useDispatch()
  const { auth, bannerState } = useSelector((state: IRootState) => state)
  const [name, setName] = useState("")
  const [isShow, setIsShow] = useState(true)
  const [image, setImage] = useState<File | null>(null)
  const [imageMobile, setImageMobile] = useState<File | null>(null)

  const axiosJWT = createAxios(auth.token, dispatch)

  const handleChangeImages = (e: React.ChangeEvent<HTMLInputElement>, setImage: any) => {
    const files = e.target.files

    if (!files) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "File does not exist." } })

    if (files[0]?.size > 1024 * 1024)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "The image largest is 1mb." } })
    setImage(files[0])
  }

  const handleCancel = () => {
    setImage(null)
    setImageMobile(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsShow(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!image) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add image." } })
    }
    await dispatch<any>(createBanner({ axiosJWT, token: auth.token, banner: { image, imageMobile, name, isShow } }))
    setRender("Banners")
  }
  return (
    <div className='add-banner'>
      <div className='add-banner__header'>
        <h1>Banner</h1>
        <button className='btn btn-outline' onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Name</h3>
        <input className='name' required placeholder='Name' onChange={handleChange} />

        <h3>Image</h3>
        <div className='add-banner__image__container'>
          <div className='image-input-container'>
            <input id='image-input' type='file' onChange={(e) => handleChangeImages(e, setImage)} accept='image/*' />
            {image ? (
              <label htmlFor='image-input' className='custom-file-upload'>
                <img src={URL.createObjectURL(image)} alt='image' />
              </label>
            ) : (
              <label htmlFor='image-input' className='custom-file-upload'>
                <IoMdImages />
                <span>Choose Image</span>
              </label>
            )}
          </div>

          <div className='image-input-container'>
            <input
              id='image-input-mobile'
              type='file'
              onChange={(e) => handleChangeImages(e, setImageMobile)}
              accept='image/*'
            />
            {imageMobile ? (
              <label htmlFor='image-input-mobile' className='custom-file-upload'>
                <img src={URL.createObjectURL(imageMobile)} alt='imageMobile' />
              </label>
            ) : (
              <label htmlFor='image-input-mobile' className='custom-file-upload'>
                <IoMdImages />
                <span>Choose Image Mobile</span>
              </label>
            )}
          </div>
        </div>

        <div className='checkbox'>
          <input type='checkbox' onChange={handleCheckbox} checked={isShow} />
          <label>Show in online store</label>
        </div>
        <div className='btn-save'>
          <button className='btn' type='submit'>
            {bannerState.loading ? <AiOutlineReload className={`${bannerState.loading ? "reload" : ""}`} /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBanner
