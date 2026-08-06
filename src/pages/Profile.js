import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiHeart, FiFileText, FiChevronLeft, FiChevronRight, FiX, FiCheck } from 'react-icons/fi'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'
import PostService from '../services/PostService'
import AuthorService from '../services/AuthorService'
import convertDate from '../utils/convertDate'
import KaanKaplanTextInput from '../utils/customFormItems/KaanKaplanTextInput'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import UserService from '../services/UserService'
import LikedPostService from '../services/LikedPostService'
import LikedPostLister from '../utils/LikedPostLister'
import { ToastContainer, toast } from 'react-toastify'

const getInitials = (first = '', last = '') =>
  ((first[0] || '') + (last[0] || '')).toUpperCase() || '?'

// ── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.93, opacity: 0, y: 16  }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                <FiX size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Profile() {
  const { userId } = useParams()
  const user = JSON.parse(localStorage.getItem('user')) || null
  const isUserProfile = user ? String(userId) === String(user.userId) : false

  const [tab, setTab] = useState('posts')          // 'posts' | 'liked'
  const [numberOfPosts, setNumberOfPosts] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [author, setAuthor] = useState({})
  const [userPosts, setUserPost] = useState([])
  const [numberOfUserLikedPosts, setNumberOfUserLikedPosts] = useState(0)

  const [showDelete, setShowDelete] = useState(false)
  const [showEdit,   setShowEdit]   = useState(false)
  const [postIdForDelete, setPostIdForDelete] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const postService   = new PostService()
  const authorService = new AuthorService()
  const likedPostService = new LikedPostService()

  function getPostsByAuthorId(page) {
    postService.getByAuthorId(userId, page).then(r => setUserPost(r.data))
  }

  async function getAuthorByUserId() {
    await authorService.getById(userId).then(r => setAuthor(r.data))
  }

  useEffect(() => {
    getPostsByAuthorId(1)
    postService.getAuthorPostCount(userId).then(r => setNumberOfPosts(r.data))
    getAuthorByUserId()
    if (user) {
      likedPostService.getNumberOfUsersLikedPosts(userId, user.token)
        .then(r => setNumberOfUserLikedPosts(r.data)).catch(() => {})
    }
  }, [])

  function handlePostDelete(postId) {
    postService.delete(postId, user.token).then(() => {
      toast.error('Post deleted')
      setUserPost(prev => prev.filter(p => (p.postId || p.id) !== postId))
      setShowDelete(false)
    })
  }

  function getOlderPosts()   { const n = pageNo + 1; setPageNo(n); getPostsByAuthorId(n) }
  function getPrevPosts()    { const n = pageNo - 1; setPageNo(n); getPostsByAuthorId(n) }

  const initValues = { firstName: author.firstName, lastName: author.lastName, email: author.email }
  const validationSchema = yup.object({
    firstName: yup.string().required('Required'),
    lastName:  yup.string().required('Required'),
    email:     yup.string().email('Invalid email').required('Required'),
  })

  const postDate = (post) => post.publishedDate || post.date
  const postLink = (post) => post.postId || post.id

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">

          {/* ── Left: Posts ─────────────────────────────────────────── */}
          <div>
            {/* Profile header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl font-bold text-slate-900">
                  {getInitials(author.firstName, author.lastName)}
                </div>
                <div>
                  <h1 className="font-heading text-3xl font-bold text-white">
                    {author.firstName} {author.lastName}
                  </h1>
                  <p className="text-slate-400 text-sm">{numberOfPosts} post{numberOfPosts !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-slate-800 rounded-xl p-1 w-fit">
                <button
                  onClick={() => setTab('posts')}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === 'posts'
                      ? 'bg-amber-500 text-slate-900 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5"><FiFileText size={14} /> Posts</span>
                </button>
                {isUserProfile && (
                  <button
                    onClick={() => setTab('liked')}
                    className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      tab === 'liked'
                        ? 'bg-amber-500 text-slate-900 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FiHeart size={14} />
                    Liked
                    {numberOfUserLikedPosts > 0 && (
                      <span className="ml-1 bg-rose-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                        {numberOfUserLikedPosts > 99 ? '99+' : numberOfUserLikedPosts}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </motion.div>

            {/* Content */}
            {tab === 'liked'
              ? <LikedPostLister user={user} numberOfLikedPosts={numberOfUserLikedPosts} />
              : (
                <div className="space-y-4">
                  {userPosts.length === 0 && (
                    <div className="text-center py-16 text-slate-500">No posts yet.</div>
                  )}
                  {userPosts.map((post, i) => (
                    <motion.div
                      key={postLink(post)}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group bg-slate-800 border border-slate-700/50 rounded-2xl p-5 hover:border-amber-500/20 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/posts/${postLink(post)}`}
                            className="font-heading text-lg font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1"
                          >
                            {post.title}
                          </Link>
                          {post.description && (
                            <p className="text-slate-400 text-sm mt-1 line-clamp-1">{post.description}</p>
                          )}
                          <p className="text-xs text-slate-500 mt-2">{convertDate(postDate(post))}</p>
                        </div>

                        {isUserProfile && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Link
                              to={`/edit/${postLink(post)}`}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 transition-all"
                            >
                              <FiEdit2 size={14} />
                            </Link>
                            <button
                              onClick={() => { setPostIdForDelete(postLink(post)); setShowDelete(true) }}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Pagination */}
                  {userPosts.length > 0 && (
                    <div className="flex items-center justify-between pt-4">
                      <div>{pageNo > 1 && (
                        <button onClick={getPrevPosts} className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
                          <FiChevronLeft size={14} /> Previous
                        </button>
                      )}</div>
                      <div>{numberOfPosts > 0 && Math.ceil(numberOfPosts / 5) !== pageNo && (
                        <button onClick={getOlderPosts} className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 hover:text-white transition-all">
                          Next <FiChevronRight size={14} />
                        </button>
                      )}</div>
                    </div>
                  )}
                </div>
              )
            }
          </div>

          {/* ── Right: Profile card ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          >
            <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl font-bold text-slate-900 mb-4">
                  {getInitials(author.firstName, author.lastName)}
                </div>
                <h2 className="font-heading text-xl font-bold text-white">
                  {author.firstName} {author.lastName}
                </h2>
                {isUserProfile && (
                  <p className="text-slate-400 text-sm mt-0.5">{author.email}</p>
                )}
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-center justify-between py-2.5 border-b border-slate-700/50">
                  <span className="text-slate-400">Posts</span>
                  <span className="font-semibold text-white">{numberOfPosts}</span>
                </div>
                {isUserProfile && (
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-700/50">
                    <span className="text-slate-400">Liked Posts</span>
                    <span className="font-semibold text-white">{numberOfUserLikedPosts}</span>
                  </div>
                )}
              </div>

              {isUserProfile && (
                <button
                  onClick={() => setShowEdit(true)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all text-sm"
                >
                  <FiEdit2 size={15} /> Edit Profile
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ToastContainer />

      {/* ── Delete Modal ─────────────────────────────────────────────── */}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Post?">
        <p className="text-slate-400 text-sm mb-6">
          This action is permanent and cannot be undone. Are you sure you want to delete this post?
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowDelete(false)}
            className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handlePostDelete(postIdForDelete)}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      </Modal>

      {/* ── Edit Modal ───────────────────────────────────────────────── */}
      <Modal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Edit Profile">
        <Formik
          enableReinitialize
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const userService = new UserService()
            userService.updateUser(user.userId, values, user.token).then(r => {
              if (r.status === 200) {
                toast.success('Profile updated!')
                getAuthorByUserId()
                setShowEdit(false)
              }
            })
          }}
        >
          <Form className="space-y-4">
            <KaanKaplanTextInput name="firstName" type="text"  placeholder="First Name" />
            <KaanKaplanTextInput name="lastName"  type="text"  placeholder="Last Name" />
            <KaanKaplanTextInput name="email"     type="email" placeholder="Email" />
            <div className="flex gap-3 justify-end pt-2">
              <button type="button" onClick={() => setShowEdit(false)}
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors">
                Cancel
              </button>
              <button type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl text-sm transition-all flex items-center gap-2">
                <FiCheck size={15} /> Save Changes
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  )
}
