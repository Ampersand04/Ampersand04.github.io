import { IHeader } from './Header.types'
import styles from './Header.module.scss'
import { Header as AntHeader } from 'antd/es/layout/layout'
import useModal from '@/hooks/useModal'
import PortfolioModal from '../PortfolioModal'
import { useAssets } from '@/hooks/useCoins'
import { Coin } from '@/types/Coin.types'
import { formatNumber } from '@/utils/formatNumber'

export const Header: React.FC<IHeader> = () => {
	const { isModalOpen, openModal, handleOk, handleCancel } = useModal()
	const { isLoading, error, data } = useAssets()

	if (isLoading)
		return (
			<AntHeader className={styles.header}>
				<div className={styles.coins}>Loading...</div>
				<PortfolioModal
					isModalOpen={isModalOpen}
					openModal={openModal}
					handleOk={handleOk}
					handleCancel={handleCancel}
				/>
			</AntHeader>
		)
	if (error)
		return (
			<AntHeader className={styles.header}>
				<div className={styles.coins}></div>
				<PortfolioModal
					isModalOpen={isModalOpen}
					openModal={openModal}
					handleOk={handleOk}
					handleCancel={handleCancel}
				/>
			</AntHeader>
		)

	const topThreeCoins = data ? data.slice(0, 3) : []

	return (
		<AntHeader className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.coins}>
					{topThreeCoins.map((coin: Coin) => (
						<div key={coin.id}>
							<h4>
								{coin.name} ({coin.symbol}):&nbsp;
							</h4>
							<p>${formatNumber(Number(coin.priceUsd))}</p>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					))}
					{topThreeCoins.map((coin: Coin) => (
						<div className={styles.add} key={coin.id}>
							<h4>
								{coin.name} ({coin.symbol}):&nbsp;
							</h4>
							<p>${formatNumber(Number(coin.priceUsd))}</p>
							&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					))}
				</div>
			</div>
			<PortfolioModal
				isModalOpen={isModalOpen}
				openModal={openModal}
				handleOk={handleOk}
				handleCancel={handleCancel}
			/>
		</AntHeader>
	)
}

export default Header
