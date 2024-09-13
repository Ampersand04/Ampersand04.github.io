import { Assets } from '@/types/Coin.types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useAssets = () => {
	const fetchCoins = async (): Promise<Assets[]> => {
		const { data } = await axios.get<{ data: Assets[] }>(
			'https://api.coincap.io/v2/assets'
		)
		return data.data
	}
	const { isLoading, error, data } = useQuery<Assets[], Error>({
		queryKey: ['coins'],
		queryFn: fetchCoins,
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false
	})

	return { isLoading, error, data }
}
