import Head from 'next/head'
import { api } from '../../src/services/api'
import { Form } from '@unform/web'
import React, { useRef } from 'react'
import { FormHandles, SubmitHandler } from '@unform/core'
import InputComponent from '../../components/inputs/input'
import ImageInputComponent from '../../components/inputs/upload'
import TextareaComponent from '../../components/inputs/textarea'
import ToastComponent, { ToastHandles } from '../../components/dialogs/toast'

interface PostFormData {
    content: string;
    subtitle: string;
    thumb: File;
    title: string;
}

export default function CreatePostPage() {
    const formRef = useRef<FormHandles>(null)
    const toastRef = useRef<ToastHandles>(null)

    const handleSubmit: SubmitHandler<PostFormData> = async data => {
        await api.post('posts',{
            content: data.content,
            subtitle: data.subtitle,
            thumb: 'conhecendo-o-next-js.png',
            title: data.title,
            authorId: 1
        }).then(response => {
            if(response.data){
                formRef.current.reset()
                toastRef.current.showToast('Post created successfully!','bg-green-500', 'text-white')
            }
        }).catch(() => {
            toastRef.current.showToast('Error when create a new post :(','bg-red-500', 'text-white')
        })
    }

    return (
        <>
            <Head>
                <title>Create Post | Next Blog</title>
            </Head>
            <ToastComponent ref={toastRef}/>
            <article className="flex flex-col mt-10 h-[40rem]">
                <header className="w-full mb-8 flex items-center justify-center">
                    <h1 className="text-3xl text-purple-400">Create Post</h1>
                </header>
                <Form ref={formRef} onSubmit={handleSubmit} className="w-96 p-4 mx-auto flex flex-col shadow border border-purple-200 rounded" encType="multipart/form-data">
                    <InputComponent type="text" name="title" label="Title"/>
                    <InputComponent type="text" name="subtitle" label="SubTitle"/>
                    <TextareaComponent name="content" label="Content"/>
                    <ImageInputComponent name="thumb"/>
                    <button className="transition-colors duration-300 bg-purple-600 hover:bg-purple-400 rounded text-white py-2" type="submit">Save</button>
                </Form>
            </article>
        </>
    )
}