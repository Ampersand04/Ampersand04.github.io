import { Assets } from '@/types/Coin.types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchAssets = async (page: number, limit: number): Promise<Assets[]> => {
	const api_url = 'https://api.coincap.io/v2/assets'
	const { data } = await axios.get<{ data: Assets[] }>(
		`${api_url}?limit=${limit}&offset=${(page - 1) * limit}`
	)
	return data.data
}

export const useAssets = (page: number, limit: number) => {
	const { isLoading, error, data } = useQuery<Assets[], Error>({
		queryKey: ['coins', page, limit],
		queryFn: () => fetchAssets(page, limit),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false
	})

	return { isLoading, error, data }
}
