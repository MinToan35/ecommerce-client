import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/authAction"
import { IRootState } from "../redux/interfaces"
import { useRouter } from "next/router"
import Sidebar from "../components/Sidebar"
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
  return (
    <div className='admin-page'>
      <Sidebar />
    </div>
  )
}

export default Admin
