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
const Customer: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(4)

  const dispatch = useDispatch()
  const { auth, user } = useSelector((state: IRootState) => state)
  const axiosJWT = createAxios(auth.token, dispatch)
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
              <select className='table-header__left__select'>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </select>
              <span>entries</span>
            </div>
            <div className='table-header__right'>
              <span>Search</span>
              <input type='search' />
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
                    onClick={() => dispatch<any>(getUsers({ axiosJWT, token: auth.token, page, limit }))}
                  >
                    <AiOutlineReload />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {user.users?.map((item, index) => (
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
              {/*<tr>
                <td className='id'>#MN0123</td>
                <td className='customer-name'>
                  <img src={"/assets/img1.jpg"} alt='avatar' />
                  <span>William Shipp</span>
                </td>
                <td>WilliamShip@gmail.com</td>
                <td>14 Apr 2022</td>
                <td>
                  <div className='status'>Active</div>
                </td>
                <td className='actions'>
                  <button className='edit'>
                    <TbEdit />
                  </button>
                  <button className='delete'>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customer
