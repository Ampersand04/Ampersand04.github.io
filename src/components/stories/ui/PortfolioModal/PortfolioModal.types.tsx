export interface IModal {
	children?: React.ReactNode
	className?: string
	isModalOpen: boolean
	openModal: () => void
	handleOk: () => void
	handleCancel: () => void
}
