import { Descriptions, Layout, Button, Spin } from 'antd'
import styles from './coinPage.module.scss'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Coin, PortfolioCoin } from '@/types/Coin.types'
import axios from 'axios'
import Header from '@/components/stories/ui/Header'
import { formatNumber } from '@/utils/formatNumber'
import { Content } from 'antd/es/layout/layout'

import { Link } from 'react-router-dom'
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import CoinAddModal from '@/components/stories/ui/CoinAddModal'
import Graphic from '@/components/stories/ui/Graphic'
import { useCoinHistory } from '@/hooks/useCoinHistory'
import { getIconUrl } from '@/utils/getIconsUrl'
import { PortfolioProvider } from '@/providers/PortfolioContext'

const fetchCoin = async (id: string): Promise<Coin> => {
	const { data } = await axios.get<{ data: Coin }>(
		`https://api.coincap.io/v2/assets/${id}`
	)
	return data.data
}
const convertToPortfolioCoin = (coin: Coin): PortfolioCoin => {
	return {
		id: coin.id || '',
		name: coin.name || '',
		symbol: coin.symbol || '',
		priceUsd: parseFloat(coin.priceUsd || '0'),
		amount: 1,
		priceUsdAtPurchase: parseFloat(coin.priceUsd || '0')
	}
}

const CoinPage: React.FC = () => {
	const { id } = useParams<{ id: string }>()

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const {
		data: historyData,
		isLoading: isLoadingHistory,
		interval,
		handleIntervalChange
	} = useCoinHistory()

	const { isLoading, error, data } = useQuery<Coin, Error>({
		queryKey: ['coin', id],
		queryFn: () => fetchCoin(id!)
	})

	const showModal = () => {
		setIsModalOpen(true)
	}

	const onModalClose = () => {
		setIsModalOpen(false)
	}

	return (
		<PortfolioProvider>
			<Layout className={styles.layout}>
				<Header />
				<Content className={styles.content}>
					<div className={styles.table}>
						<div className={styles.header}>
							<div className={styles.top}>
								{isLoading ? (
									<div className={styles.loader}>
										<Spin
											indicator={<LoadingOutlined spin />}
										/>
										<h4> Loading </h4>
									</div>
								) : error ? (
									<div className={styles.error}>
										<h4>
											Error. Reload the page or return{' '}
											<Link to={'/'}> home</Link>
										</h4>
									</div>
								) : (
									<>
										<Link to={'/'}>
											<ArrowLeftOutlined />
										</Link>
										<img
											src={getIconUrl(data?.symbol ?? '')}
											alt={data?.symbol}
											width={32}
										/>

										<h2>
											{data?.name} ({data?.symbol})
										</h2>
									</>
								)}
							</div>
							{!isLoading && !error && (
								<Button
									color="blue"
									type="primary"
									onClick={() => {
										showModal()
									}}
								>
									Add +
								</Button>
							)}
						</div>

						<br />
						<Descriptions bordered>
							<Descriptions.Item label="Rank">
								{data?.rank}
							</Descriptions.Item>
							<Descriptions.Item label="Price (USD)">
								{formatNumber(Number(data?.priceUsd))}
							</Descriptions.Item>
							<Descriptions.Item label="Market Cap (USD)">
								{formatNumber(Number(data?.marketCapUsd))}
							</Descriptions.Item>
							<Descriptions.Item label="Volume (24hr)">
								{formatNumber(Number(data?.volumeUsd24Hr))}
							</Descriptions.Item>
							<Descriptions.Item label="Supply">
								{formatNumber(Number(data?.supply))}
							</Descriptions.Item>
							<Descriptions.Item label="Max Supply">
								{data?.maxSupply
									? formatNumber(Number(data?.maxSupply))
									: 'N/A'}
							</Descriptions.Item>
						</Descriptions>

						<br />

						{/* График цены */}
						<Graphic
							data={historyData}
							interval={interval}
							handleIntervalChange={handleIntervalChange}
							isLoading={isLoadingHistory}
						/>

						{data && (
							<CoinAddModal
								coin={convertToPortfolioCoin(data)}
								onClose={onModalClose}
								onOpen={isModalOpen}
							/>
						)}
					</div>
				</Content>
			</Layout>
		</PortfolioProvider>
	)
}

export default CoinPage
