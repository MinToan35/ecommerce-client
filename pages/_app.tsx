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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toast />
    </Provider>
  )
}

const Toast: React.FC = () => {
  const { alert } = useSelector((state: IRootState) => state)

  useEffect(() => {
    if (alert) {
      if (alert.loading) toast.info(alert.loading)
      if (alert.success) toast.success(alert.success)
      if (alert.error) toast.error(alert.error)
    }
  }, [alert])
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
