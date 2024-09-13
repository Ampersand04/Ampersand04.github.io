export const formatNumber = (num: number): string => {
	if (num >= 1_000_000_000) {
		return `${(num / 1_000_000_000).toFixed(2)}b`
	} else if (num >= 1_000_000) {
		return `${(num / 1_000_000).toFixed(2)}m`
	} else if (num >= 1_000) {
		return `${(num / 1_000).toFixed(2)}k`
	} else {
		return `${(num / 1).toFixed(2)}`
	}
}
