import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/authAction"
import { IRootState } from "../redux/interfaces"
import { useRouter } from "next/router"
import Sidebar from "../components/Sidebar"
import HeaderAdmin from "../components/header-admin"
import Customer from "../components/admin/Customer"
import { getUsers } from "../redux/actions/userAction"
import { createAxios } from "../utils/createInstance"
const Admin: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { auth } = useSelector((state: IRootState) => state)

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.title = "Admin"
    }
  }, [])

  useEffect(() => {
    if ((auth.user && auth.user.role !== "admin") || !auth.user) {
      router.push("/login")
    }
  }, [auth.user])

  const axiosJWT = createAxios(auth.token, dispatch)

  useEffect(() => {
    dispatch<any>(getUsers({ axiosJWT, token: auth.token, page: 1, limit: 10 }))
  }, [])
  return (
    <div className='admin-page'>
      <Sidebar />
      <HeaderAdmin />
      <Customer />
    </div>
  )
}

export default Admin
