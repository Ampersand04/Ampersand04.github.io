import { StoryObj, type Meta } from '@storybook/react'
import CoinAddModal from './CoinAddModal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { PortfolioProvider } from '@/providers/PortfolioContext'

export default {
	title: 'COMPONENTS/UI/CoinAddModal',
	component: CoinAddModal,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<PortfolioProvider>
					<Story />
				</PortfolioProvider>
			</QueryClientProvider>
		)
	],
	onOpen: {
		control: { type: 'boolean' },
		defaultValue: true
	},
	onClose: { action: 'closed' }
} as Meta<typeof CoinAddModal>

type Story = StoryObj<typeof CoinAddModal>

export const Default: Story = {
	args: {
		coin: {
			id: '1',
			symbol: 'sda',
			name: 'Bitcoin',
			priceUsd: 45000.0,
			amount: 3,
			priceUsdAtPurchase: 23
		},
		onOpen: true
	}
}
