import { useCallback, useState } from 'react'
import { UseModalReturn } from '@/types/useModal.interface'

const useModal = (): UseModalReturn => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = useCallback(() => {
		setIsModalOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsModalOpen(false)
	}, [])

	const handleOk = useCallback(() => {
		closeModal()
	}, [closeModal])

	const handleCancel = useCallback(() => {
		closeModal()
	}, [closeModal])

	return {
		isModalOpen,
		openModal,
		closeModal,
		handleOk,
		handleCancel
	}
}

export default useModal
