import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

interface Props {
    name: string
    label?: string
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export default function InputComponent({ name, label, ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const { fieldName, defaultValue, registerField, error } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
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
        <div className="w-full h-14 flex flex-col mb-3">
            {label && <label className="text-sm pb-1 text-purple-800" htmlFor={fieldName}>{label}</label>}

            <input
                className="border h-10 border-purple-200 rounded text-sm px-2 outline-none focus:ring focus:ring-purple-300"
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />

            {error && <span>{error}</span>}
        </div>
    )
}