import React, { useState } from "react"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"
import { TbEdit } from "react-icons/tb"
import { FiTrash2 } from "react-icons/fi"
import { AiOutlineReload } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../redux/actions/userAction"
import { createAxios } from "../../utils/createInstance"
import { IRootState } from "../../redux/interfaces"
import { formatDate } from "../../utils/formatDay"
import ReactPaginate from "react-paginate"
import Pagination from "../Pagination"
import PaginationComponent from "../PaginationComponent"

const Customer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [searchTerm, setSearchTerm] = useState("")

  const dispatch = useDispatch()
  const { auth, user } = useSelector((state: IRootState) => state)
  const axiosJWT = createAxios(auth.token, dispatch)

  //Get curent posts
  const indexOfLastPost = currentPage * itemsPerPage
  const indexOfFirstPost = indexOfLastPost - itemsPerPage

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value)
  }

  const filteredUsers = user.users?.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))

  const currentItems = filteredUsers?.slice(indexOfFirstPost, indexOfLastPost)
  return (
    <div className='customer'>
      <div className='customer-container'>
        <div className='customer-container__header'>
          <h1>Customer</h1>
          <div className='header-right__title'>Manager / Customer</div>
        </div>
        <button className='btn-add'>+ Add customers</button>
        <div className='table-customer'>
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

          <table>
            <thead>
              <tr>
                <th className='sorting-asc'>
                  <div className='table-title'>
                    <span>Customer ID</span>
                    <div className='sorting'>
                      <BsArrowUp className='up' />
                      <BsArrowDown className='down' />
                    </div>
                  </div>
                </th>
                <th className='sorting-asc'>
                  <div className='table-title'>
                    <span>Customer</span>
                    <div className='sorting'>
                      <BsArrowUp className='up' />
                      <BsArrowDown className='down' />
                    </div>
                  </div>
                </th>
                <th className='sorting-asc'>
                  <div className='table-title'>
                    <span>Email</span>
                    <div className='sorting'>
                      <BsArrowUp className='up' />
                      <BsArrowDown className='down' />
                    </div>
                  </div>
                </th>
                <th className='sorting-asc'>
                  <div className='table-title'>
                    <span>Join Date</span>
                    <div className='sorting'>
                      <BsArrowUp className='up' />
                      <BsArrowDown className='down' />
                    </div>
                  </div>
                </th>
                <th className='sorting-asc'>
                  <div className='table-title'>
                    <span>Status</span>
                    <div className='sorting'>
                      <BsArrowUp className='up' />
                      <BsArrowDown className='down' />
                    </div>
                  </div>
                </th>
                <th className='sorting-asc'>
                  <button
                    className={`table-title ${user.loading ? "reload" : ""}`}
                    onClick={() => dispatch<any>(getUsers({ axiosJWT, token: auth.token }))}
                  >
                    <AiOutlineReload />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((item, index) => (
                <tr key={index}>
                  <td className='id'>{item._id}</td>
                  <td>
                    <div className='customer-name'>
                      <img src={item.avatar} alt='avatar' />
                      <span>{item.username}</span>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <div className='status'>{item.status}</div>
                  </td>
                  <td className='actions'>
                    <button className='edit'>
                      <TbEdit />
                    </button>
                    <button className='delete'>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalItems={filteredUsers?.length || 0}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Customer
