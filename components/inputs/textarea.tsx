import { useRef, useEffect, TextareaHTMLAttributes } from 'react'

import { useField } from '@unform/core'

interface Props {
  name: string
  label?: string
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Props

export default function TextareaComponent({ name, label, ...rest }: TextareaProps) {
  const textareaRef = useRef(null)
  const { fieldName, defaultValue = '', registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <div className="w-full flex flex-col mb-3">
      {label && <label className="text-sm pb-1 text-purple-800" htmlFor={fieldName}>{label}</label>}

      <textarea
        className="border h-20 border-purple-200 rounded text-sm p-2 outline-none focus:ring focus:ring-purple-300 resize-y"
        ref={textareaRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span>{error}</span>}
    </div>
  )
}