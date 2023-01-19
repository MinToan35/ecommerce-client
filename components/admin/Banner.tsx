import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IBanner, IRootState } from "../../redux/interfaces"
import { BsArrowUp, BsArrowDown, BsEye, BsEyeSlash } from "react-icons/bs"
import { deleteBanner, getBanners, updateBanner } from "../../redux/actions/bannerAction"
import { AiOutlineReload } from "react-icons/ai"
import { createAxios } from "../../utils/createInstance"
import { TbEdit } from "react-icons/tb"
import { FiTrash2 } from "react-icons/fi"
import Pagination from "../Pagination"
import { GLOBALTYPES } from "../../redux/actions/globalTypes"
import { FaTimes } from "react-icons/fa"
interface Props {
  setRender: React.Dispatch<React.SetStateAction<any>>
  setBanner: React.Dispatch<React.SetStateAction<any>>
}

const Banner: React.FC<Props> = ({ setRender, setBanner }) => {
  const { auth, user, bannerState } = useSelector((state: IRootState) => state)
  const dispatch = useDispatch()
  const axiosJWT = createAxios(auth.token, dispatch)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [searchTerm, setSearchTerm] = useState("")

  const [isModalDelete, setIsModalDelete] = useState(false)
  const [bannerId, setBannerId] = useState<string | undefined>("")
  //Get curent banners
  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage

  const filterBanners = bannerState.banners?.filter(
    (banner) => banner?.name && banner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentItems = filterBanners?.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleDelete = async () => {
    await dispatch<any>(deleteBanner({ axiosJWT, token: auth.token, banner: { _id: bannerId } }))
    setRender("Banners")
    setIsModalDelete(false)
    dispatch({ type: GLOBALTYPES.MODAL, payload: false })
  }

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const handleShow = (item: IBanner | undefined) => {
    if (!item) return
    if (bannerState.loading) return
    dispatch<any>(
      updateBanner({
        axiosJWT,
        token: auth.token,
        banner: {
          image: item.image,
          imageMobile: item.imageMobile,
          name: item.name,
          isShow: !item.isShow,
          _id: item._id
        }
      })
    )
  }
  return (
    <>
      <div className='banner-admin'>
        <div className='banner-admin__container__header'>
          <h1>Banner</h1>
          <button className='btn' onClick={() => setRender("AddBanner")}>
            + New Banner
          </button>
        </div>
        <div className='table-banner'>
          <div className='table-header'>
            <div className='table-header__left'>
              <span>Show</span>
              <select
                className='table-header__left__select'
                value={itemsPerPage}
                onChange={(e: any) => setItemsPerPage(e.target.value)}
              >
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </select>
              <span>entries</span>
            </div>
            <div className='table-header__right'>
              <span>Search</span>
              <input type='search' onChange={handleSearch} />
            </div>
          </div>
          {bannerState.banners && bannerState.banners.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th className='sorting-asc'>
                      <div className='table-title'>
                        <span>Banner</span>
                        <div className='sorting'>
                          <BsArrowUp className='up' />
                          <BsArrowDown className='down' />
                        </div>
                      </div>
                    </th>
                    <th className='sorting-asc'>
                      <div className='table-title'>
                        <span>Image</span>
                        <div className='sorting'>
                          <BsArrowUp className='up' />
                          <BsArrowDown className='down' />
                        </div>
                      </div>
                    </th>
                    <th className='sorting-asc'>
                      <div className='table-title'>
                        <span>ImageMobile</span>
                        <div className='sorting'>
                          <BsArrowUp className='up' />
                          <BsArrowDown className='down' />
                        </div>
                      </div>
                    </th>
                    <th className='sorting-asc'>
                      <button
                        className={`table-title ${user.loading ? "reload" : ""}`}
                        onClick={() => dispatch<any>(getBanners({ axiosJWT, token: auth.token }))}
                      >
                        <AiOutlineReload />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td className='image'>
                        {typeof item?.image === "string" && <img src={item.image} alt='image' />}
                      </td>
                      <td className='imageMobile'>
                        <div>{typeof item?.imageMobile === "string" && <img src={item.imageMobile} alt='image' />}</div>
                      </td>
                      <td className='actions'>
                        <button className='show' onClick={() => handleShow(item)}>
                          {item?.isShow ? <BsEye /> : <BsEyeSlash />}
                        </button>
                        <button className='edit'>
                          <TbEdit
                            onClick={() => {
                              setRender("AddBanner")
                              setBanner(item)
                            }}
                          />
                        </button>
                        <button className='delete'>
                          <FiTrash2
                            onClick={() => {
                              setIsModalDelete(true)
                              setBannerId(item?._id)
                              dispatch({ type: GLOBALTYPES.MODAL, payload: true })
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                totalItems={filterBanners?.length || 0}
                handlePageChange={handlePageChange}
              />
            </>
          ) : (
            <div className='banner-admin__content-empty'>
              <img src='/assets/add-product-logo.png' alt='img' />
              <h2>Add your first product</h2>
              <p>Once you start adding banners, you'll see them here.</p>
              <button className='btn' onClick={() => setRender("AddBanner")}>
                + New Banner
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`modal-delete-container ${isModalDelete ? "" : "hidden"}`}>
        <div className='modal-delete'>
          <div className='modal-delete__main'>
            <img src='/assets/trash.png' alt='' />
            <div className='modal-delete__content'>
              <h2>DELETE</h2>
              <p>Do you want to hide products without deleting them?</p>
            </div>
            <button
              className='btn-close'
              onClick={() => {
                setIsModalDelete(false)
                dispatch({ type: GLOBALTYPES.MODAL, payload: false })
              }}
            >
              <FaTimes />
            </button>
          </div>
          <button className='btn btn-delete' onClick={handleDelete}>
            {bannerState.loading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Banner
