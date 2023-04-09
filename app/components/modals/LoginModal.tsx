'use client'

import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Modal from './Modal'
import Button from '../Button'
import Heading from '../Heading'
import Input from '../inputs/Input'

import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggleModal = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          First time using airbnb?
          <span
            onClick={toggleModal}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
