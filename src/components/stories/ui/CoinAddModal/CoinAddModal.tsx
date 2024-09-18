import React, { useState } from 'react'
import { Modal, InputNumber } from 'antd'
import { usePortfolio } from '@/providers/PortfolioContext'
import { CoinAddModalProps } from './CoinAddModal.types'
import { formatNumber } from '@/utils/formatNumber'
import Button from '../../ux/Button'

const CoinAddModal: React.FC<CoinAddModalProps> = ({
	coin,
	onOpen,
	onClose
}) => {
	const [amount, setAmount] = useState<number>(1)
	const { addCoinToPortfolio } = usePortfolio()

	const handleAddCoin = () => {
		addCoinToPortfolio(coin, amount)
		onClose()
	}

	return (
		<>
			<Modal
				title={`Buy ${coin?.name}`}
				open={onOpen}
				onCancel={onClose}
				footer={[
					<Button
						type="default"
						color="blue"
						key="cancel"
						onClick={onClose}
					>
						Cancel
					</Button>,
					<Button
						type="primary"
						color="blue"
						key="buy"
						onClick={handleAddCoin}
					>
						Buy
					</Button>
				]}
			>
				<div>
					<p>
						Current Price: {formatNumber(Number(coin?.priceUsd))}{' '}
						USD
					</p>
					<InputNumber
						min={0.001}
						value={amount}
						onChange={(value) => {
							if (value !== null) {
								setAmount(value)
							}
						}}
						style={{ width: '100%' }}
					/>
				</div>
			</Modal>
		</>
	)
}

export default CoinAddModal
