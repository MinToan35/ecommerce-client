import { useEffect } from "react"

interface Props {
  title: string
  children: React.ReactNode
}

const Helmet: React.FC<Props> = (props) => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.title = "MT-Shop " + props.title
      window.scroll(0, 0)
    }
  }, [props.title])

  return <div className=''>{props.children}</div>
}

export default Helmet
