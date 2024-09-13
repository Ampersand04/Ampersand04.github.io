import { StoryObj, type Meta } from '@storybook/react'
import Header from './Header'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/main'
import { PortfolioProvider } from '@/providers/PortfolioContext'

export default {
	title: 'COMPONENTS/UI/Header',
	component: Header,
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<PortfolioProvider>
					<Story />
				</PortfolioProvider>
			</QueryClientProvider>
		)
	]
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Default: Story = {}
