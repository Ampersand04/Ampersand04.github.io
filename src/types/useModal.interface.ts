export interface UseModalReturn {
	isModalOpen: boolean
	handleOk: () => void
	handleCancel: () => void
	openModal: () => void
	closeModal: () => void
}
