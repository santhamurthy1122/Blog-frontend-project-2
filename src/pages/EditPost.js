import React, { useEffect, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { motion } from 'framer-motion'
import { FiSave, FiArrowLeft } from 'react-icons/fi'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import PostService from '../services/PostService'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import KaanKaplanTextInput from '../utils/customFormItems/KaanKaplanTextInput'

export default function EditPost() {
  const { postId } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const postService = new PostService()

  const [post, setPost] = useState({})
  const [postText, setPostText] = useState('')

  useEffect(() => {
    postService.getByPostId(postId).then(r => {
      setPost(r.data || {})
      setPostText(r.data?.content || '')
    })
  }, [])

  const initValues = { title: post?.title, description: post?.description }
  const validationSchema = yup.object({
    title: yup.string().required('Please give your post a title'),
  })

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Navbar />

      {/* Page header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-b border-slate-700/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Link to={`/posts/${postId}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors mb-5 group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} />
            Back to post
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl font-bold text-white"
          >
            Edit Post
          </motion.h1>
          <p className="text-slate-400 mt-2">Update your article</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Formik
            enableReinitialize
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              values.content = postText
              postService.edit(postId, user.userId, values, user.token)
                .then(r => { if (r.status === 200) navigate('/posts/' + postId) })
                .catch(console.error)
            }}
          >
            <Form className="space-y-5">
              <KaanKaplanTextInput name="title"       type="text" placeholder="Post Title" />
              <KaanKaplanTextInput name="description" type="text" placeholder="Short Description (optional)" />

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Post Content</label>
                <div className="ck-editor-wrapper rounded-xl overflow-hidden border border-slate-600">
                  <CKEditor
                    editor={ClassicEditor}
                    data={postText}
                    config={{ placeholder: 'Edit your post content...' }}
                    onReady={editor => {
                      setTimeout(() => { editor.setData(post.content || '') }, 300)
                      editor.ui.view.editable.element.style.minHeight = '420px'
                    }}
                    onChange={(_, editor) => {
                      editor.ui.view.editable.element.style.minHeight = '420px'
                      setPostText(editor.getData())
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                >
                  <FiSave size={17} /> Save Changes
                </motion.button>
              </div>
            </Form>
          </Formik>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
