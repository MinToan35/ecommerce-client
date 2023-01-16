import React, { useEffect, useState } from "react"

interface Todo {
  title: string
}

const renderData = (data: Todo[]) => {
  return (
    <ul>
      {data.map((todo, index) => {
        return <li key={index}>{todo.title}</li>
      })}
    </ul>
  )
}

const PaginationComponent: React.FC = () => {
  const [data, setData] = useState<Todo[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [pageNumberLimit, setPageNumberLimit] = useState(5)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const handleClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setCurrentPage(Number(event.currentTarget.id))
  }

  const pages = []
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number.toString()}
          onClick={handleClick}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </li>
      )
    } else {
      return null
    }
  })

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json))
  }, [])

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1)

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1)

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  let pageIncrementBtn = null
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>
  }

  let pageDecrementBtn = null

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}> … </li>
  }

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 5)
  }

  return (
    <>
      <h1>Todo List</h1> <br />
      {renderData(currentItems)}
      <ul className='pageNumbers'>
        <li>
          <button onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className='loadmore'>
        Load More
      </button>
    </>
  )
}

export default PaginationComponent
