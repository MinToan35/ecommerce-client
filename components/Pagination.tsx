import React, { useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
interface Props {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  handlePageChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ itemsPerPage, totalItems, currentPage, handlePageChange }) => {
  const pages: number[] = []
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i)
  }

  const [pageNumberLimit, setPageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number.toString()}
          onClick={() => handlePageChange(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </li>
      )
    } else {
      return null
    }
  })

  const maxPage = Math.ceil(totalItems / itemsPerPage)

  const handleNextBtn = () => {
    if (currentPage < maxPage) {
      handlePageChange(currentPage + 1)
      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
      }
    }
  }

  const handlePrevBtn = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
      }
    }
  }

  let pageDecrementBtn = null
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}> … </li>
  }

  let pageIncrementBtn = null
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>
  }
  return (
    <div className='pagination'>
      <div className='page-info'>
        Showing {1 + (currentPage - 1) * itemsPerPage} to {itemsPerPage * currentPage} of {totalItems} entries
      </div>
      <ul className='pageNumbers'>
        <li className='prev'>
          <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
            <FaChevronLeft />
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li className='next'>
          <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
            <FaChevronRight />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination
