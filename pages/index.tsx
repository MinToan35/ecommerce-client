import React, { useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { logout } from "../redux/actions/authAction"
import { IRootState } from "../redux/interfaces"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { auth } = useSelector((state: IRootState) => state)

  useEffect(() => {
    if (!auth.user) {
      router.push("/login")
    }
  }, [auth.user])
  return (
    <>
      <button className='btn-submit' onClick={() => dispatch<any>(logout(auth.user._id))}>
        Logout
      </button>
    </>
  )
}
