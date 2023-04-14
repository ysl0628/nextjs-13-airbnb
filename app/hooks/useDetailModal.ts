import { create } from 'zustand'

interface DetailModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useDetailModal = create<DetailModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export default useDetailModal
