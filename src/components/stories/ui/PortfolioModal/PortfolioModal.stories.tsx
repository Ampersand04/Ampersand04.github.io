import { StoryObj, type Meta } from '@storybook/react'
import PortfolioModal from './PortfolioModal'
import { queryClient } from '@/main'
import { QueryClientProvider } from '@tanstack/react-query'
import { PortfolioProvider } from '@/providers/PortfolioContext'

export default {
	title: 'COMPONENTS/UI/PortfolioModal',
	component: PortfolioModal,
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
} as Meta<typeof PortfolioModal>

type Story = StoryObj<typeof PortfolioModal>

export const Default: Story = {}
