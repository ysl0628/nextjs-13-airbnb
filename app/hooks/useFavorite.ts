import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, MouseEvent } from 'react'
import { toast } from 'react-hot-toast'

import { SafeUser } from '../types'

import useLoginModal from './useLoginModal'

interface IFavorite {
  currentUser?: SafeUser | null
  listingId: string
}

const useFavorite = ({ currentUser, listingId }: IFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorite = useMemo(() => {
    return currentUser?.favoriteIds?.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        loginModal.onOpen()
        return
      }

      try {
        let request
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()

        toast.promise(request(), {
          loading: 'loading...',
          success: '成功',
          error: 'error occurs in data'
        })
      } catch (error) {
        toast.error('Something went wrong')
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  )

  return {
    hasFavorite,
    toggleFavorite
  }
}

export default useFavorite
