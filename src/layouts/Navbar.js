import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiBookOpen, FiUser, FiEdit, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { removeUserToRedux } from '../store/actions/userActions'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const [isLoggedIn, setIsLoggedIn] = useState(!!user)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    dispatch(removeUserToRedux(user))
    localStorage.clear()
    setIsLoggedIn(false)
    setIsOpen(false)
    navigate('/')
  }

  const navLinks = isLoggedIn
    ? [
        { label: 'Articles', path: '/posts', icon: <FiBookOpen size={15} /> },
        { label: 'Profile', path: `/profile/${user?.userId}`, icon: <FiUser size={15} /> },
        { label: 'New Post', path: '/createPost', icon: <FiEdit size={15} />, accent: true },
      ]
    : [
        { label: 'Articles', path: '/posts', icon: <FiBookOpen size={15} /> },
        { label: 'Login', path: '/login', icon: <FiLogIn size={15} /> },
        { label: 'Register', path: '/register', icon: <FiUserPlus size={15} />, accent: true },
      ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b border-slate-700/40 ${
      scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-xl shadow-black/30' : 'bg-slate-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span
              whileHover={{ scale: 1.04 }}
              className="font-heading text-2xl font-bold text-white tracking-tight"
            >
              Blog<span className="text-amber-500">.</span>
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <motion.div key={link.path} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    link.accent
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </motion.div>
            ))}
            {isLoggedIn && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-4 py-2 ml-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 text-sm font-medium transition-all duration-150"
              >
                <FiLogOut size={15} />
                Logout
              </motion.button>
            )}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-700/40 bg-slate-900"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    link.accent
                      ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 text-sm font-medium transition-colors"
                >
                  <FiLogOut size={15} />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
