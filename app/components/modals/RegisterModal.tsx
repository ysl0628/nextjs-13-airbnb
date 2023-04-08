'use client'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import axios from 'axios'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      await axios.post('/api/register', data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to airbnb" subtitle="Create an account" />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
      actionLabel="Continue"
    />
  )
}

export default RegisterModal
