import { PortfolioCoin } from '@/types/Coin.types'

export interface CoinAddModalProps {
	coin: PortfolioCoin
	onOpen: boolean
	onClose: () => void
}
