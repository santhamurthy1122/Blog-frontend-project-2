import React from 'react'
import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'

const socials = [
  { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <FaGithub size={18} />, href: 'https://github.com/santhamurthy1122', label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/santhamurthy-1122-r', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/40 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/">
            <span className="font-heading text-2xl font-bold text-white">
              Blog<span className="text-amber-500">.</span>
            </span>
          </Link>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <Link to="/posts" className="hover:text-amber-400 transition-colors">Articles</Link>
            <Link to="/login" className="hover:text-amber-400 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-amber-400 transition-colors">Register</Link>
          </div>

          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Blog Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
