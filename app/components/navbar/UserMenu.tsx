'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import { SafeUser } from '@/app/types'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

interface UserMenuProps {
  currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen)

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          {currentUser ? `Hi, ${currentUser.name}` : 'Airbnb your home'}
        </div>
        {/* Menu 和 會員人像 */}
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[60vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="我的旅遊" onClick={() => {}} />
                <MenuItem label="我的最愛" onClick={() => {}} />
                <MenuItem label="我的預定" onClick={() => {}} />
                <MenuItem label="我的設定" onClick={() => {}} />
                <MenuItem label="Airbnb My home" onClick={() => {}} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen()
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    registerModal.onOpen()
                    toggleOpen()
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
