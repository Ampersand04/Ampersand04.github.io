import { IModal } from './PortfolioModal.types'
import Button from '@/components/stories/ux/Button'
import { List, Modal, Typography } from 'antd'
import { PortfolioProvider, usePortfolio } from '@/providers/PortfolioContext'
import { PortfolioCoin } from '@/types/Coin.types'
import { useEffect, useState } from 'react'
import { formatNumber } from '@/utils/formatNumber'

export const PortfolioModal: React.FC<IModal> = ({
	isModalOpen,
	openModal,
	handleOk,
	handleCancel
}) => {
	const [portfolio, setPortfolio] = useState<PortfolioCoin[]>([])
	const [currentValue, setCurrentValue] = useState(0)
	const [initialValue, setInitialValue] = useState(0)

	const {
		removeCoinFromPortfolio,

		difference,
		differencePercent
	} = usePortfolio()

	useEffect(() => {
		const savedPortfolio = JSON.parse(
			localStorage.getItem('portfolio') || '[]'
		)
		setTimeout(() => {
			setPortfolio(savedPortfolio)
		}, 10)

		const initial = savedPortfolio.reduce(
			(acc: number, coin: PortfolioCoin) =>
				acc + coin.priceUsdAtPurchase * coin.amount,
			0
		)
		const current = savedPortfolio.reduce(
			(acc: number, coin: PortfolioCoin) =>
				acc + coin.priceUsd * coin.amount,
			0
		)

		setInitialValue(initial)
		setCurrentValue(current)
	}, [portfolio])

	return (
		<PortfolioProvider>
			<Button onClick={openModal} color="blue">
				{formatNumber(initialValue)} USD{' '}
				{difference > 0
					? `+${difference.toFixed(2)}`
					: difference.toFixed(2)}{' '}
				({differencePercent.toFixed(2)}%)
			</Button>

			<Modal
				title={`Portfolio ${formatNumber(currentValue)} USD`}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[]}
			>
				<List
					dataSource={portfolio}
					renderItem={(coin: PortfolioCoin) => (
						<List.Item
							actions={[
								<Button
									type="link"
									onClick={() =>
										removeCoinFromPortfolio(coin.id)
									}
								>
									Remove
								</Button>
							]}
						>
							<Typography.Text>
								{coin.name} ({coin.symbol})
							</Typography.Text>{' '}
							- {coin.amount} coins at $
							{formatNumber(coin?.priceUsd)} each
						</List.Item>
					)}
				/>
			</Modal>
		</PortfolioProvider>
	)
}

export default PortfolioModal
