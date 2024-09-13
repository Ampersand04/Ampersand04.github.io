export interface IGraphic {
	data:
		| {
				priceUsd: string
				time: number
		  }[]
		| undefined
	className?: string
	interval: string
	isLoading: boolean
	handleIntervalChange: (value: string) => void
}
