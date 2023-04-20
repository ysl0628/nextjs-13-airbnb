'use client'

import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '../Avatar'
import MenuItem from './MenuItem'

import { SafeUser } from '@/app/types'
import useRentModal from '@/app/hooks/useRentModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { useRouter } from 'next/navigation'

import { AiFillWarning } from 'react-icons/ai'

interface UserMenuProps {
  currentUser: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const rentModal = useRentModal()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((isOpen) => !isOpen)

  // 確認是否有登入，有登入則開啟租房 modal
  // 沒有登入則開啟登入 modal
  const onRentClick = useCallback(() => {
    if (!currentUser) {
      toast('請先登入', {
        icon: <AiFillWarning color="#ffbb33" />
      })
      return loginModal.onOpen()
    }
    // rent modal open
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  const onMenuClick = useCallback(
    (target: string) => {
      router.push(target || '/')
      setIsOpen((isOpen) => !isOpen)
    },
    [router]
  )

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRentClick}
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
          Airbnb your home
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
            <Avatar src={currentUser?.image} />
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
                <MenuItem
                  label="我的旅遊"
                  onClick={() => onMenuClick('/trips')}
                />
                <MenuItem
                  label="我的最愛"
                  onClick={() => onMenuClick('/favorites')}
                />
                <MenuItem
                  label="我的預定"
                  onClick={() => onMenuClick('/reservations')}
                />
                <MenuItem
                  label="我的房源"
                  onClick={() => onMenuClick('/properties')}
                />
                <MenuItem label="Airbnb My home" onClick={rentModal.onOpen} />
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
