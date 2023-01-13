import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/authAction"
import { IRootState } from "../redux/interfaces"
import { useRouter } from "next/router"
const Admin = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { auth } = useSelector((state: IRootState) => state)

  useEffect(() => {
    if ((auth.user && auth.user.role !== "admin") || !auth.user) {
      router.push("/login")
    }
  }, [auth.user])
  return (
    <div>
      <button className='btn-submit' onClick={() => dispatch<any>(logout(auth.user._id))}>
        Logout
      </button>
    </div>
  )
}

export default Admin
