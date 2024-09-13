import { StoryObj, type Meta } from '@storybook/react'
import CoinsTable from './CoinsTable'
import { QueryClientProvider } from '@tanstack/react-query'
import { PortfolioProvider } from '@/providers/PortfolioContext'
import { queryClient } from '@/main'
import { BrowserRouter } from 'react-router-dom'

export default {
	title: 'COMPONENTS/UI/CoinsTable',
	component: CoinsTable,
	decorators: [
		(Story) => (
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<PortfolioProvider>
						<Story />
					</PortfolioProvider>
				</QueryClientProvider>
			</BrowserRouter>
		)
	],
	tags: ['autodocs']
} as Meta<typeof CoinsTable>

type Story = StoryObj<typeof CoinsTable>

export const Default: Story = {}
