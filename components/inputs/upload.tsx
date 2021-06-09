import React, {
    ChangeEvent,
    useRef,
    useEffect,
    useCallback,
    useState,
} from 'react';

import { useField } from '@unform/core';
import { FaImage } from 'react-icons/fa';

interface Props {
    name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export default function ImageInputComponent({ name, ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [preview, setPreview] = useState(defaultValue);

    const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setPreview(null);
        }

        const previewURL = URL.createObjectURL(file);

        setPreview(previewURL);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'files[0]',
            clearValue(ref: HTMLInputElement) {
                ref.value = '';
                setPreview(null);
            },
            setValue(_: HTMLInputElement, value: string) {
                setPreview(value);
            },
        });
    }, [fieldName, registerField]);

    return (
        <div className="w-full flex flex-col mb-3">
            {preview ? <img className="w-full max-h-40 rounded-md mb-3" src={preview} alt="Preview" /> : (
                <div className="w-full h-40 rounded-md mb-3 border border-purple-200 flex items-center justify-center">
                    <p className="text-purple-600 flex items-center"><FaImage className="mr-2"/> Image Preview</p>
                </div>
            )}
            <input 
                className="border border-purple-200 rounded text-sm p-2 outline-none focus:ring focus:ring-purple-300"
                type="file" 
                ref={inputRef} 
                onChange={handlePreview} 
                {...rest} 
            />
        </div>
    );
};