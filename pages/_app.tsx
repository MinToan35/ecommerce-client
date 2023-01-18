import React, { useEffect } from "react"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import store from "../redux/store"
import "../styles/index.scss"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { IRootState } from "../redux/interfaces"
import { useDispatch } from "react-redux"
import { refreshToken } from "../redux/actions/authAction"
import Loading from "../components/Loading"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Refresh />
      <Component {...pageProps} />
      <Toast />
    </Provider>
  )
}

const Refresh: React.FC = () => {
  const { alert } = useSelector((state: IRootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (alert) {
      if (alert.success) toast.success(alert.success)
      if (alert.error) toast.error(alert.error)
    }
  }, [alert])

  useEffect(() => {
    dispatch<any>(refreshToken())
  }, [])

  if (alert.loading) return <Loading />
  return <></>
}

const Toast: React.FC = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}
