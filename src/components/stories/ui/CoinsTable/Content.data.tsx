import { ColumnsType } from 'antd/es/table'
import { Assets, PortfolioCoin } from '@/types/Coin.types'
import { ReactNode } from 'react'
import Button from '../../ux/Button'
import { formatNumber } from '@/utils/formatNumber'
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'

interface ColumnsProps {
	showModal: () => void
	setSelectedCoin: (coin: PortfolioCoin) => void
	getIconUrl: (symbol: string) => string
}

export const columns = ({
	showModal,
	setSelectedCoin,
	getIconUrl
}: ColumnsProps): ColumnsType<Assets> => [
	{
		title: 'Rank',
		dataIndex: 'rank',
		key: 'rank'
	},
	{
		title: 'Name',
		key: 'nameSymbol',
		fixed: 'left',
		render: (record: Assets) => (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<img
					src={getIconUrl(record.symbol ?? '')}
					alt={record.symbol}
					width={32}
					style={{ marginRight: 10 }}
				/>
				{`${record.name} (${record.symbol})`}
			</div>
		)
	},
	{
		title: 'Price (USD)',
		dataIndex: 'priceUsd',
		key: 'priceUsd',
		render: (price: string) =>
			Number(price) < 0.01
				? 'N/A'
				: `$${formatNumber(parseFloat(price))}`,
		sorter: (a: Assets, b: Assets) =>
			Number(b.priceUsd) - Number(a.priceUsd)
	},
	{
		title: 'Market Cap (USD)',
		dataIndex: 'marketCapUsd',
		key: 'marketCapUsd',
		render: (marketCap: string) =>
			`$${formatNumber(parseFloat(marketCap))}`,
		sorter: (a: Assets, b: Assets) =>
			Number(b.marketCapUsd) - Number(a.marketCapUsd)
	},
	{
		title: 'Change (24hr)',
		dataIndex: 'changePercent24Hr',
		key: 'changePercent24Hr',
		render: (change: string): ReactNode => {
			const changeValue = parseFloat(change)
			const isPositive = changeValue > 0
			return (
				<div style={{ color: 'green' }}>
					{isPositive ? (
						<b style={{ color: 'green' }}>
							<CaretUpFilled />
							{`${parseFloat(change).toFixed(2)}%`}
						</b>
					) : (
						<b style={{ color: 'red' }}>
							<CaretDownFilled />
							{`${parseFloat(change).toFixed(2)}%`}
						</b>
					)}
				</div>
			)
		},
		sorter: (a: Assets, b: Assets) =>
			Number(b.changePercent24Hr) - Number(a.changePercent24Hr)
	},
	{
		title: 'Action',
		key: 'action',
		render: (coin: PortfolioCoin) => (
			<div
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<Button
					color="blue"
					type="primary"
					onClick={() => {
						setSelectedCoin(coin)
						showModal()
					}}
				>
					Add +
				</Button>
			</div>
		)
	}
]
