import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight, FiClock, FiHeart, FiInbox } from 'react-icons/fi'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import PostService from '../services/PostService'
import convertDate from '../utils/convertDate'

const estimateReadTime = (content = '') =>
  Math.max(1, Math.ceil(content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200))

const getInitials = (name = '') =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??'

const avatarColors = ['bg-amber-500', 'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500']
const avatarColor = (name = '') => avatarColors[name.charCodeAt(0) % avatarColors.length]

export default function Posts() {
  const postService = new PostService()
  const [numberOfPosts, setNumberOfPosts] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function handleSearch() {
    if (searchText.trim().length > 0) {
      setTimeout(() => {
        postService.filterByTitle(searchText.toLowerCase()).then(r => setPosts(r.data))
      }, 500)
    } else {
      getSortedPost(1)
    }
  }

  async function getSortedPost(page) {
    setLoading(true)
    await postService.getSortedDate(page).then(r => setPosts(r.data))
    setLoading(false)
  }

  useEffect(() => {
    postService.getNumberOfPosts().then(r => setNumberOfPosts(r.data))
    getSortedPost(pageNo)
  }, [])

  function getOlderPosts() {
    const n = pageNo + 1; setPageNo(n); getSortedPost(n)
  }
  function getPreviousPosts() {
    const n = pageNo - 1; setPageNo(n); getSortedPost(n)
  }
  function handleFilter(e) {
    const val = e.target.value
    if (val === '2') postService.getMostLiked(1).then(r => setPosts(r.data))
    else getSortedPost(1)
  }

  const authorName = (post) =>
    post?.author?.name ||
    ((post?.author?.firstName || '') + ' ' + (post?.author?.lastName || '')).trim() ||
    'Unknown'
  
  const postId = (post) => post.id || post.postId
  const postDate = (post) => post.date || post.publishedDate

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      {/* Hero banner */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl font-bold text-white mb-3"
          >
            Blog Posts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Discover stories, ideas, and knowledge from writers everywhere
          </motion.p>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Search + filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex gap-3 mb-10"
        >
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyUp={handleSearch}
              placeholder="Search posts..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            <select
              onChange={handleFilter}
              className="bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 appearance-none transition-all cursor-pointer"
            >
              <option value="1">Latest</option>
              <option value="2">Most Liked</option>
            </select>
          </div>
        </motion.div>

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <FiInbox size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No posts found</h3>
            <p className="text-slate-500">Try a different search term or filter.</p>
          </motion.div>
        )}

        {/* Post list */}
        <div className="space-y-5">
          {posts.map((post, i) => {
            const name = authorName(post)
            const id = postId(post)
            const readTime = estimateReadTime(post.content)
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="group bg-slate-800 border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/posts/${id}`)}
              >
                <div className="flex items-start gap-4">
                  {/* Author avatar */}
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white ${avatarColor(name)}`}>
                    {getInitials(name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Author + date */}
                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-400">
                      <Link
                        to={`/profile/${post?.author?.userId || post?.author?.id}`}
                        onClick={e => e.stopPropagation()}
                        className="font-medium text-slate-300 hover:text-amber-400 transition-colors"
                      >
                        {name}
                      </Link>
                      <span>·</span>
                      <span>{convertDate(postDate(post))}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-heading text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-1 leading-snug">
                      {post.title}
                    </h2>

                    {/* Description */}
                    {post.description && (
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">
                        {post.description}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FiClock size={12} /> {readTime} min read
                      </span>
                      {(post.likeCount > 0) && (
                        <span className="flex items-center gap-1">
                          <FiHeart size={12} /> {post.likeCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex items-center justify-between mt-10">
            <div>
              {pageNo > 1 && (
                <motion.button
                  whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}
                  onClick={getPreviousPosts}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all"
                >
                  <FiChevronLeft /> Previous
                </motion.button>
              )}
            </div>
            <span className="text-xs text-slate-500">Page {pageNo}</span>
            <div>
              {numberOfPosts > 0 && Math.ceil(numberOfPosts / 5) !== pageNo && (
                <motion.button
                  whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}
                  onClick={getOlderPosts}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-all"
                >
                  Next <FiChevronRight />
                </motion.button>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
