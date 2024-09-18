import { PortfolioCoin } from '@/types/Coin.types'
import {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
	useCallback
} from 'react'
import { useAssets } from '@/hooks/useCoins'

interface PortfolioContextType {
	portfolio: PortfolioCoin[]
	addCoinToPortfolio: (coin: PortfolioCoin, amount: number) => void
	removeCoinFromPortfolio: (id: string) => void
	currentValue: number
	initialValue: number
	difference: number
	differencePercent: number
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
	undefined
)

const PortfolioProvider = ({ children }: { children: ReactNode }) => {
	const [portfolio, setPortfolio] = useState<PortfolioCoin[]>([])
	const [currentValue, setCurrentValue] = useState(0)
	const [initialValue, setInitialValue] = useState(0)
	const [difference, setDifference] = useState(0)
	const [differencePercent, setDifferencePercent] = useState(0)

	const { data: assetsData } = useAssets(1, 100)

	useEffect(() => {
		const savedPortfolio: PortfolioCoin[] = JSON.parse(
			localStorage.getItem('portfolio') || '[]'
		)
		setPortfolio(savedPortfolio)
	}, [])

	const addCoinToPortfolio = useCallback(
		(newCoin: PortfolioCoin, amount: number) => {
			const priceUsdAtPurchase = newCoin.priceUsd || 0

			setPortfolio((prevPortfolio) => {
				const existingCoin = prevPortfolio.find(
					(coin) => coin.id === newCoin.id
				)

				let updatedPortfolio: PortfolioCoin[]

				if (existingCoin) {
					updatedPortfolio = prevPortfolio.map((coin) =>
						coin.id === newCoin.id
							? { ...coin, amount: coin.amount + amount }
							: coin
					)
				} else {
					updatedPortfolio = [
						...prevPortfolio,
						{
							id: newCoin.id || '',
							name: newCoin.name || '',
							symbol: newCoin.symbol || '',
							priceUsd: newCoin.priceUsd || 0,
							amount,
							priceUsdAtPurchase
						}
					]
				}

				localStorage.setItem(
					'portfolio',
					JSON.stringify(updatedPortfolio)
				)
				return updatedPortfolio
			})
		},
		[]
	)

	const removeCoinFromPortfolio = useCallback((id: string) => {
		setPortfolio((prevPortfolio) => {
			const updatedPortfolio = prevPortfolio.filter(
				(coin) => coin.id !== id
			)
			localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio))
			return updatedPortfolio
		})
	}, [])

	useEffect(() => {
		const initial = portfolio.reduce(
			(acc, coin) => acc + coin.priceUsdAtPurchase * coin.amount,
			0
		)

		const current = portfolio.reduce((acc, coin) => {
			const currentCoin = assetsData?.find(
				(asset) => asset.id === coin.id
			)
			const currentPrice = Number(currentCoin?.priceUsd) || coin.priceUsd
			return acc + currentPrice * coin.amount
		}, 0)

		setInitialValue(initial)
		setCurrentValue(current)

		const diff = current - initial
		setDifference(diff)

		const diffPercent = initial === 0 ? 0 : (diff / initial) * 100
		setDifferencePercent(diffPercent)
	}, [portfolio, assetsData])

	return (
		<PortfolioContext.Provider
			value={{
				portfolio,
				addCoinToPortfolio,
				removeCoinFromPortfolio,
				currentValue,
				initialValue,
				difference,
				differencePercent
			}}
		>
			{children}
		</PortfolioContext.Provider>
	)
}

const usePortfolio = () => {
	const context = useContext(PortfolioContext)
	if (context === undefined) {
		throw new Error('usePortfolio must be used within a PortfolioProvider')
	}
	return context
}

export { PortfolioProvider, usePortfolio }
