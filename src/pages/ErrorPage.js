import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-8xl font-heading font-bold text-amber-500 mb-4">404</p>
        <h1 className="font-heading text-3xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-slate-400 text-lg mb-10 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
        >
          <FiArrowLeft size={17} /> Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
