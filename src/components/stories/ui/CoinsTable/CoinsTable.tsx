import { ICoinTable } from './CoinsTable.types'
import styles from './CoinsTable.module.scss'
import { Spin, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Coin, PortfolioCoin } from '@/types/Coin.types'
import { columns } from './Content.data'
import { useAssets } from '@/hooks/useCoins'
import { useNavigate } from 'react-router'
import Input from '../../ux/Input'
import CoinAddModal from '../CoinAddModal'
import { LoadingOutlined } from '@ant-design/icons'
import { getIconUrl } from '@/utils/getIconsUrl'

export const CoinsTable: React.FC<ICoinTable> = () => {
	const { isLoading, error, data } = useAssets()

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [selectedCoin, setSelectedCoin] = useState<PortfolioCoin | undefined>(
		undefined
	)
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 790)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const onModalClose = () => {
		setIsModalOpen(false)
	}

	const navigate = useNavigate()

	const [searchText, setSearchText] = useState<string>('')

	const handleRowClick = (record: Coin) => {
		navigate(`/coin/${record.id}`)
	}

	const filteredData = data?.filter((coin) =>
		coin.name.toLowerCase().includes(searchText.toLowerCase())
	)
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value)
	}

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 790)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={styles.coins_table}>
			<div className={styles.head}>
				<Typography.Title className={styles.title} level={2}>
					Cryptocurrency Prices
				</Typography.Title>

				<Input
					handleInputChange={handleInputChange}
					searchText={searchText}
				/>
			</div>

			<div className={styles.tableContainer}>
				{isLoading ? (
					<div className={styles.loader}>
						<Spin indicator={<LoadingOutlined spin />} />
						<h4> Loading </h4>
					</div>
				) : error ? (
					<div className={styles.error}>
						<h4>Somthing went wrong.</h4>
					</div>
				) : (
					<Table
						className={styles.table}
						dataSource={isLoading ? undefined : filteredData}
						columns={columns({
							showModal,
							setSelectedCoin,
							getIconUrl
						})}
						rowKey="id"
						pagination={{ pageSize: 10 }}
						onRow={(record) => ({
							onClick: () => handleRowClick(record)
						})}
						scroll={isMobile ? { x: 1000 } : undefined}
					/>
				)}
			</div>

			{selectedCoin && (
				<CoinAddModal
					coin={selectedCoin}
					onClose={onModalClose}
					onOpen={isModalOpen}
				/>
			)}
		</div>
	)
}

export default CoinsTable
