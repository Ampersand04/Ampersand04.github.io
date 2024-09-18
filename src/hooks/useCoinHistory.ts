import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router'

const filterDataByInterval = (
	data: Array<{ priceUsd: string; time: number }>,
	interval: string
) => {
	const now = Date.now()
	let timeLimit

	switch (interval) {
		case 'h2':
			timeLimit = now - 26 * 60 * 60 * 1000
			break
		case 'h1':
			timeLimit = now - 12 * 60 * 60 * 1000
			break
		case 'm5':
			timeLimit = now - 1.05 * 60 * 60 * 1000
			break
		default:
			timeLimit = 0 // Не фильтровать, если интервал не определен
			break
	}

	return data.filter((item) => item.time >= timeLimit)
}

export const useCoinHistory = () => {
	const { id } = useParams<{ id: string }>()

	const [interval, setInterval] = useState<string>('h2')

	const fetchCoinHistory = async (id: string, interval: string) => {
		const api_url = 'https://api.coincap.io/v2/assets'
		const { data } = await axios.get<{
			data: Array<{ priceUsd: string; time: number }>
		}>(`${api_url}/assets/${id}/history?interval=${interval}`)
		return data.data
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['coinHistory', id, interval],
		queryFn: () => fetchCoinHistory(id!, interval),
		enabled: !!id
	})

	const handleIntervalChange = (value: string) => {
		setInterval(value)
	}
	const filteredData = data ? filterDataByInterval(data, interval) : []

	return {
		isLoading,
		error,
		data: filteredData,
		handleIntervalChange,
		interval
	}
}
