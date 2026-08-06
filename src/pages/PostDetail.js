import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart, FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import LikedPostService from '../services/LikedPostService'
import PostService from '../services/PostService'
import UserService from '../services/UserService'
import convertDate from '../utils/convertDate'
import { ToastContainer, toast } from 'react-toastify'

const getInitials = (first = '', last = '') =>
  ((first[0] || '') + (last[0] || '')).toUpperCase() || '?'

const estimateReadTime = (content = '') =>
  Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))

export default function PostDetail() {
  const { postId } = useParams()
  const user = JSON.parse(localStorage.getItem('user')) || null

  const userService = new UserService()
  const likedPostService = new LikedPostService()

  const [postLikeCount, setPostLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [post, setPost] = useState({})
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    const postService = new PostService()
    postService.getByPostId(postId).then(r => setPost(r.data || {}))
    likedPostService.getPostLikeCount(postId).then(r => setPostLikeCount(r.data || 0)).catch(() => {})
    if (user) {
      likedPostService.getUserLikedPost(user.userId, postId, user.token)
        .then(r => { if (r.data) setIsLiked(true) }).catch(() => {})
    }
  }, [])

  async function handleLike() {
    if (!user) {
      toast('You must be logged in to like posts', { position: 'bottom-right', theme: 'dark' })
      return
    }
    if (liking) return
    setLiking(true)
    try {
      if (isLiked) {
        await userService.removeLikePost(postId, user.userId, user.token)
        setIsLiked(false)
        setPostLikeCount(c => Math.max(0, c - 1))
      } else {
        await userService.likePost(postId, user.userId, user.token)
        setIsLiked(true)
        setPostLikeCount(c => c + 1)
        toast('Post liked!', { position: 'bottom-right', theme: 'dark' })
      }
    } catch { /* silent */ }
    setLiking(false)
  }

  const firstName = post?.author?.firstName || ''
  const lastName  = post?.author?.lastName  || ''
  const authorId  = post?.author?.userId    || post?.author?.id
  const readTime  = estimateReadTime(post?.content || '')

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 border-b border-slate-700/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            {/* Back link */}
            <Link
              to="/posts"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors mb-8 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} />
              Back to posts
            </Link>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {post?.title || 'Loading…'}
            </h1>

            {post?.description && (
              <p className="text-slate-400 text-lg mb-6">{post.description}</p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
              {(firstName || lastName) && (
                <Link
                  to={`/profile/${authorId}`}
                  className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xs font-semibold text-amber-400">
                    {getInitials(firstName, lastName)}
                  </div>
                  {firstName} {lastName}
                </Link>
              )}
              {(post?.publishedDate || post?.date) && (
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={13} />
                  {convertDate(post?.publishedDate || post?.date)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <FiClock size={13} /> {readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <FiHeart size={13} />
                {postLikeCount} {postLikeCount === 1 ? 'like' : 'likes'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article body */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 py-12"
        >
          {/* Content */}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: post?.content || '' }}
          />

          {/* Like button */}
          <div className="flex justify-center mt-14">
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 shadow-lg ${
                isLiked
                  ? 'bg-rose-500/20 border-2 border-rose-500/50 text-rose-400 hover:bg-rose-500/30'
                  : 'bg-slate-800 border-2 border-slate-700 text-slate-300 hover:border-rose-500/40 hover:text-rose-400'
              }`}
            >
              <AnimatePresence mode="wait">
                {isLiked
                  ? <motion.span key="liked" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                      <FaHeart className="text-rose-500" size={20} />
                    </motion.span>
                  : <motion.span key="unlike" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                      <FiHeart size={20} />
                    </motion.span>
                }
              </AnimatePresence>
              {isLiked ? 'Liked' : 'Like'} · {postLikeCount}
            </motion.button>
          </div>

          {/* Author card */}
          {(firstName || lastName) && (
            <div className="mt-14 bg-slate-800 border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500/30 flex items-center justify-center text-xl font-bold text-amber-400 flex-shrink-0">
                {getInitials(firstName, lastName)}
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Written by</p>
                <Link
                  to={`/profile/${authorId}`}
                  className="text-lg font-semibold text-white hover:text-amber-400 transition-colors font-heading"
                >
                  {firstName} {lastName}
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  )
}
