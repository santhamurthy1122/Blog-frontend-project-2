import React from 'react'
import { useField, Field } from 'formik'
import { FiAlertCircle } from 'react-icons/fi'

export default function KaanKaplanTextInput({ ...props }) {
  const [field, meta] = useField(props)
  const hasError = meta.touched && !!meta.error

  return (
    <div className="space-y-1">
      {props.placeholder && (
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-slate-300">
          {props.placeholder}
        </label>
      )}
      <Field
        {...field}
        {...props}
        className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all duration-150 ${
          hasError
            ? 'border-red-500/60 focus:ring-red-500/30 focus:border-red-500'
            : 'border-slate-600 focus:ring-amber-500/40 focus:border-amber-500 hover:border-slate-500'
        }`}
        placeholder=""
      />
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <FiAlertCircle size={12} /> {meta.error}
        </p>
      )}
    </div>
  )
}
