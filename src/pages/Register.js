import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { FiUserPlus, FiCheckCircle } from 'react-icons/fi'
import KaanKaplanTextInput from '../utils/customFormItems/KaanKaplanTextInput'
import AuthService from '../services/AuthService'

export default function Register() {
  const authService = new AuthService()
  const navigate    = useNavigate()

  const initValues = { firstName: '', lastName: '', email: '', password: '' }
  const validationSchema = yup.object({
    firstName: yup.string().required('Please enter your first name'),
    lastName:  yup.string().required('Please enter your last name'),
    email:     yup.string().email('Must be a valid email').required('Please enter your email'),
    password:  yup.string().min(6, 'Password must be at least 6 characters').required('Please enter a password'),
  })

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center w-5/12 bg-gradient-to-br from-slate-800 to-slate-900 border-r border-slate-700/40 p-12">
        <Link to="/" className="font-heading text-3xl font-bold text-white mb-12">
          Blog<span className="text-amber-500">.</span>
        </Link>
        <h2 className="font-heading text-4xl font-bold text-white mb-4 leading-tight">
          Join the writing community
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed mb-10">
          Create an account in seconds and start sharing your knowledge with the world.
        </p>
        <ul className="space-y-3 text-slate-400 text-sm">
          {['Publish unlimited posts', 'Connect with readers', 'Track your likes and followers'].map(t => (
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

          <h1 className="font-heading text-3xl font-bold text-white mb-1">Create Account</h1>
          <p className="text-slate-400 text-sm mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>

          <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              authService.register(values)
                .then(() => navigate('/login/first'))
                .catch(() => {})
            }}
          >
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <KaanKaplanTextInput name="firstName" type="text" placeholder="First name" />
                <KaanKaplanTextInput name="lastName"  type="text" placeholder="Last name" />
              </div>
              <KaanKaplanTextInput name="email"    type="email"    placeholder="Email address" />
              <KaanKaplanTextInput name="password" type="password" placeholder="Password" />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2"
              >
                <FiUserPlus size={17} /> Create Account
              </motion.button>
            </Form>
          </Formik>
        </motion.div>
      </div>
    </div>
  )
}
