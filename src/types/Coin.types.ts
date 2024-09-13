export interface Assets {
	id: string
	rank: string
	symbol: string
	name: string
	priceUsd: string
	marketCapUsd: string
	changePercent24Hr: string
}

export interface Coin {
	id?: string
	rank?: string
	symbol?: string
	name?: string
	supply?: string
	maxSupply?: string | null
	marketCapUsd?: string
	volumeUsd24Hr?: string
	priceUsd?: string
	changePercent24Hr?: string
	vwap24Hr?: string | null
}

export interface PortfolioCoin {
	id: string
	name: string
	symbol: string
	priceUsd: number
	amount: number
	priceUsdAtPurchase: number
}
