import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiChevronLeft, FiChevronRight, FiInbox } from 'react-icons/fi'
import convertDate from './convertDate'
import LikedPostService from '../services/LikedPostService'

export default function LikedPostLister({ user, numberOfLikedPosts }) {
  const [pageNo, setPageNo] = useState(1)
  const [userLikedPosts, setUserLikedPosts] = useState([])

  function getUserAllLikePosts(page) {
    const likedPostService = new LikedPostService()
    likedPostService.getUsersAllLikedPosts(user.userId, page, user.token)
      .then(r => setUserLikedPosts(r.data || []))
      .catch(() => {})
  }

  useEffect(() => { getUserAllLikePosts(1) }, [])

  function getOlderPosts()  { const n = pageNo + 1; setPageNo(n); getUserAllLikePosts(n) }
  function getPrevPosts()   { const n = pageNo - 1; setPageNo(n); getUserAllLikePosts(n) }

  if (userLikedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FiInbox size={40} className="text-slate-600 mb-3" />
        <p className="text-slate-500 text-sm">No liked posts yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {userLikedPosts.map((item, i) => {
        const post = item.post || item
        const postId = post.postId || post.id
        return (
          <motion.div
            key={postId}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group bg-slate-800 border border-slate-700/50 rounded-2xl p-5 hover:border-amber-500/20 transition-all"
          >
            <div className="flex items-start gap-3">
              <FiHeart className="text-rose-400 flex-shrink-0 mt-1" size={16} />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/posts/${postId}`}
                  className="font-heading text-lg font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1"
                >
                  {post.title}
                </Link>
                {post.description && (
                  <p className="text-slate-400 text-sm mt-0.5 line-clamp-1">{post.description}</p>
                )}
                <p className="text-xs text-slate-500 mt-1.5">
                  {convertDate(post.publishedDate || post.date)}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div>{pageNo > 1 && (
          <button onClick={getPrevPosts} className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
            <FiChevronLeft size={14} /> Previous
          </button>
        )}</div>
        <div>{numberOfLikedPosts > 0 && Math.ceil(numberOfLikedPosts / 5) !== pageNo && (
          <button onClick={getOlderPosts} className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
            Next <FiChevronRight size={14} />
          </button>
        )}</div>
      </div>
    </div>
  )
}
