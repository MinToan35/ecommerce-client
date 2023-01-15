import React, { useState, useEffect } from "react"
import { GoSearch } from "react-icons/go"
import { BiFullscreen, BiExitFullscreen, BiBell } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { IRootState } from "../redux/interfaces"
import { BsChevronDown } from "react-icons/bs"
import { MdOutlineSettings } from "react-icons/md"
import { RiLogoutCircleRLine } from "react-icons/ri"
import { logout } from "../redux/actions/authAction"

const HeaderAdmin = () => {
  const { auth } = useSelector((state: IRootState) => state)
  const dispatch = useDispatch()

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDropDown, setIsDropDown] = useState(false)

  useEffect(() => {
    // Add event listener for fullscreenchange event
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const handleFullscreenChange = () => {
    setIsFullscreen(document.fullscreen)
  }

  const handleFullscreenToggle = async () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else {
      const element = document.querySelector("#__next")
      if (element) {
        element.requestFullscreen()
      }
    }
  }
  return (
    <header className='header-admin'>
      <form className='search-container'>
        <input className='search' placeholder='Search...' />
        <span className='search-icon'>
          <GoSearch />
        </span>
      </form>
      <div className='header__right'>
        <button className='btn-fullscreen' onClick={handleFullscreenToggle}>
          {isFullscreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </button>
        <button className='btn-notify'>
          <BiBell />
        </button>
        <button className='header-dropdown' onClick={() => setIsDropDown(!isDropDown)}>
          <img src={auth.user?.avatar} alt='avatar' />
          <span>{auth.user?.username}</span>
          <BsChevronDown />
          <ul className={`list-items ${isDropDown ? "show" : ""}`}>
            <li className='item'>
              <MdOutlineSettings />
              <span>View Profile</span>
            </li>
            <li className='item' onClick={() => dispatch<any>(logout())}>
              <RiLogoutCircleRLine />
              <span>Sign out</span>
            </li>
          </ul>
        </button>
      </div>
    </header>
  )
}

export default HeaderAdmin
