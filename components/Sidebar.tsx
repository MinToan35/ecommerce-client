import React, { MouseEventHandler, ReactEventHandler, useState } from "react"
import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai"
import { BsShop, BsChevronDown } from "react-icons/bs"
import { FiMail } from "react-icons/fi"
import { BiHome } from "react-icons/bi"
const Sidebar: React.FC = () => {
  const [active, setActive] = useState<string | null>("")
  const [dropdown, setDropdown] = useState<boolean>(false)

  const handleActive: MouseEventHandler<HTMLLIElement> = (e) => {
    if (e.currentTarget.dataset.name) setActive(e.currentTarget.dataset.name)
    if (dropdown && e.currentTarget.dataset.name === active) setDropdown(false)
    if (!dropdown && e.currentTarget.dataset.name) setDropdown(!dropdown)
  }

  interface ISubMenu {
    name: string
    icon: JSX.Element
    items?: string[]
  }
  interface ISidebarItem {
    title: string
    subMenu: ISubMenu[]
  }

  const sideBarItem: ISidebarItem[] = [
    {
      title: "Menu",
      subMenu: [
        {
          name: "manager",
          icon: <BsShop />,
          items: ["Customers", "Add Product"]
        },
        {
          name: "dashboard",
          icon: <BiHome />
        }
      ]
    },
    {
      title: "Contact",
      subMenu: [
        {
          name: "email",
          icon: <FiMail />,
          items: ["Inbox", "Read Email"]
        }
      ]
    }
  ]

  return (
    <div className='sidebar'>
      <div className='sidebar__logo'>
        <Link href='/'>
          <img className='logo' src='/assets/logo-1.png' alt='logo' />
          <h2>Shop</h2>
        </Link>
      </div>
      <button className='menu-btn'>
        <AiOutlineMenu />
      </button>

      {/* ==== main ==== */}
      <div className='sidebar-menu__scroll'>
        <div className='sidebar__menu'>
          {sideBarItem.map((item, index) => (
            <ul className='menu-list' key={index}>
              <li className='menu-title'>{item.title}</li>
              {item.subMenu.map((it, ind) => (
                <li
                  data-name={it.name}
                  className={`menu-item ${active === it.name ? "active" : ""}`}
                  onClick={handleActive}
                  key={ind}
                >
                  <div className='menu-item__header'>
                    <div className='menu-item__left'>
                      {it.icon}
                      <span>{it.name}</span>
                    </div>
                    {it.items && <BsChevronDown className={`${active === it.name && dropdown === true ? "up" : ""}`} />}
                  </div>

                  <ul className={`sub-menu ${active === it.name && dropdown === true ? "active" : ""}`}>
                    {it.items && it.items.map((el, num) => <li key={num}>{el}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
