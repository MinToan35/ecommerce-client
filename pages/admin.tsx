import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/authAction"
import { IRootState } from "../redux/interfaces"
import { useRouter } from "next/router"
import Sidebar from "../components/Sidebar"
import HeaderAdmin from "../components/header-admin"
import Customer from "../components/admin/Customer"
import { getUsers } from "../redux/actions/userAction"
import { createAxios } from "../utils/createInstance"
import Head from "next/head"
import Banner from "../components/admin/Banner"
import { getBanners } from "../redux/actions/bannerAction"
import AddBanner from "../components/admin/AddBanner"
const Admin: React.FC = () => {
  const [render, setRender] = useState("Banners")

  const dispatch = useDispatch()
  const router = useRouter()
  const { auth, modal } = useSelector((state: IRootState) => state)

  useEffect(() => {
    if ((auth.user && auth.user.role !== "admin") || !auth.user) {
      router.push("/login")
    }
  }, [auth.user])

  const axiosJWT = createAxios(auth.token, dispatch)

  useEffect(() => {
    dispatch<any>(getUsers({ axiosJWT, token: auth.token }))
    dispatch<any>(getBanners({ axiosJWT, token: auth.token }))
  }, [])

  return (
    <div className={`admin-page ${modal ? "modal" : ""}`}>
      <Head>
        <title>Admin - MT Shop</title>
        <meta name='keywords' content='admin,MT Shop Admin,admin page' />
        <meta name='description' content='Admin page MT Shop' />
      </Head>
      <Sidebar setRender={setRender} />
      <HeaderAdmin />
      {render === "Customers" && <Customer />}
      {render === "Banners" && <Banner setRender={setRender} />}
      {render === "AddBanner" && <AddBanner setRender={setRender} />}
    </div>
  )
}

export default Admin
