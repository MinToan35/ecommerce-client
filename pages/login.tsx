import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/actions/authAction"
import { ILoginData, IRootState } from "../redux/interfaces"

import Link from "next/link"
import { useRouter } from "next/router"

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { auth } = useSelector((state: IRootState) => state)

  const initialState = { email: "", password: "" }
  const [userData, setUserData] = useState<ILoginData>(initialState)

  const { email, password } = userData
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch<any>(login(userData))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.title = "Login"
    }
  }, [])

  useEffect(() => {
    if (auth.user && auth.user.role === "admin") {
      router.push("/admin")
    } else if (auth.user && auth.user.role === "user") {
      router.push("/")
    }
  }, [auth.user])
  return (
    <div className='auth_page'>
      <form onSubmit={handleSubmit}>
        <div className='auth-form'>
          <h2>Login</h2>
          <p>
            Don&#39;t have an account?
            <Link href='/register'>Register here</Link>
          </p>
          <input type='email' name='email' value={email} placeholder='Email' onChange={handleChange} required />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleChange}
            required
          />
          <p className='forgot'>
            <Link href={"/forgot-password"}>Forgot password?</Link>
          </p>
          <button type='submit' className='btn-submit'>
            Sign in
          </button>
        </div>
      </form>

      <div className='auth_page__right'>
        <h1>
          Welcome to <span>MT Shop</span>
        </h1>
      </div>
    </div>
  )
}

export default Login
