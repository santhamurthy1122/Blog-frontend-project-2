import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiBookOpen, FiEdit3, FiHeart } from 'react-icons/fi'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import blog_svg3 from '../images/blog_svg3.svg'
import blog_svg4 from '../images/blog_svg4.svg'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' }
  })
}

const features = [
  { icon: <FiBookOpen size={24} />, title: 'Discover Stories', desc: 'Browse hundreds of articles across every topic imaginable.' },
  { icon: <FiEdit3 size={24} />, title: 'Share Your Voice', desc: 'Write and publish your own posts with our rich text editor.' },
  { icon: <FiHeart size={24} />, title: 'Like & Follow', desc: 'Like the posts you love and track them in your profile.' },
]

const socials = [
  { icon: <FaTwitter size={20} />, href: '#', label: 'Twitter' },
  { icon: <FaGithub size={20} />, href: 'https://github.com/santhamurthy1122', label: 'GitHub' },
  { icon: <FaLinkedin size={20} />, href: 'https://www.linkedin.com/in/santhamurthy-1122-r', label: 'LinkedIn' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="bg-slate-900 min-h-screen">

      {/* ── Inline Navbar for home page ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <span className="font-heading text-2xl font-bold text-white">
            Blog<span className="text-amber-500">.</span>
          </span>
          <nav className="flex items-center gap-2">
            <button
              onClick={() => navigate('/posts')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Articles
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-lg transition-colors shadow-md shadow-amber-500/20"
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 30% 40%, #1e3a5f 0%, #0f172a 65%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-sm font-medium text-amber-400">Your ideas deserve an audience</span>
              </motion.div>

              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="show"
                className="font-heading text-5xl sm:text-6xl font-bold text-white leading-tight mb-6"
              >
                Explore Posts on{' '}
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Different Topics
                </span>
              </motion.h1>

              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-lg text-slate-400 mb-8 leading-relaxed"
              >
                A sharing platform with more than 1000 blog posts. Read, like, and write about topics
                you love. Join a community of curious minds.
              </motion.p>

              <motion.div
                custom={3} variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/posts')}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-7 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/25"
                >
                  Browse Articles <FiArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-medium px-7 py-3 rounded-xl transition-all"
                >
                  Sign In
                </motion.button>
              </motion.div>
            </div>

            {/* Right illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <img src={blog_svg3} alt="Blog illustration" className="w-full max-w-md drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Feature cards ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl font-bold text-white mb-3">Everything You Need</h2>
          <p className="text-slate-400 text-lg">Read, write, and connect — all in one place.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-4">
                {f.icon}
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Become an Author ─────────────────────────────────────────── */}
      <section className="bg-slate-800/50 border-y border-slate-700/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="hidden lg:flex justify-center"
            >
              <img src={blog_svg4} alt="Author illustration" className="w-full max-w-md" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-4xl font-bold text-white mb-4">
                Become an Author
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Start writing and publishing blog posts on any topic right now.
                Share what you know, let others read and like your work.
                All you need is an account — it takes 30 seconds.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/register')}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/25"
              >
                Create Account <FiArrowRight />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About + Social ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-4xl font-bold text-white mb-4">About Blog App</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Share your ideas with the world, learn from others while reading their posts.
            Write and like posts, view your favorites on your profile, filter by topic or popularity.
            Built for curious minds.
          </p>

          <div className="flex items-center justify-center gap-4">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-700/40 py-8 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Blog Project. All rights reserved.
      </footer>
    </div>
  )
}
