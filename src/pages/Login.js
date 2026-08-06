import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FiLogIn, FiCheckCircle } from 'react-icons/fi'
import KaanKaplanTextInput from '../utils/customFormItems/KaanKaplanTextInput'
import AuthService from '../services/AuthService'
import { useDispatch } from 'react-redux'
import { addUserToRedux } from '../store/actions/userActions'
import UserService from '../services/UserService'
import { ToastContainer, toast } from 'react-toastify'

export default function Login() {
  const { first } = useParams()
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const authService = new AuthService()
  const userService = new UserService()

  const initValues = { email: '', password: '' }
  const validationSchema = yup.object({
    email:    yup.string().required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })

  async function handleLogin(values) {
    const response = await authService.login(values).catch(() => {
      toast.error('Email or password is incorrect', { position: 'top-right', theme: 'colored' })
    })
    if (response?.status === 200) {
      await userService.getUserByEmail(values.email).then(r => {
        const user = {
          userId:    r.data.userId,
          firstName: r.data.firstName,
          lastName:  r.data.lastName,
          email:     values.email,
          token:     response.headers['authorization'],
        }
        dispatch(addUserToRedux(user))
        localStorage.setItem('user', JSON.stringify(user))
      })
      navigate('/posts')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center w-5/12 bg-gradient-to-br from-slate-800 to-slate-900 border-r border-slate-700/40 p-12">
        <Link to="/" className="font-heading text-3xl font-bold text-white mb-12">
          Blog<span className="text-amber-500">.</span>
        </Link>
        <h2 className="font-heading text-4xl font-bold text-white mb-4 leading-tight">
          Welcome back to the community
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          Sign in to continue reading, writing, and connecting with authors around the world.
        </p>
        <ul className="space-y-3 text-slate-400 text-sm">
          {['Access your saved posts', 'Write and edit articles', 'Like and track your favorites'].map(t => (
            <li key={t} className="flex items-center gap-2.5">
              <FiCheckCircle className="text-amber-500 flex-shrink-0" size={16} />
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="font-heading text-2xl font-bold text-white lg:hidden mb-8 block">
            Blog<span className="text-amber-500">.</span>
          </Link>

          <h1 className="font-heading text-3xl font-bold text-white mb-1">Sign In</h1>
          <p className="text-slate-400 text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Create one
            </Link>
          </p>

          {first === 'first' && (
            <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
              <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-emerald-300">
                Activation email sent. Please verify your account before logging in.
              </p>
            </div>
          )}

          <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form className="space-y-4">
              <KaanKaplanTextInput name="email"    type="text"     placeholder="Email address" />
              <KaanKaplanTextInput name="password" type="password" placeholder="Password" />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2"
              >
                <FiLogIn size={17} /> Sign In
              </motion.button>
            </Form>
          </Formik>
        </motion.div>
        <ToastContainer />
      </div>
    </div>
  )
}
