import { StoryObj, type Meta } from '@storybook/react'
import Graphic from './Graphic'

export default {
	title: 'COMPONENTS/UI/Graphic',
	component: Graphic,
	tags: ['autodocs']
} as Meta<typeof Graphic>

type Story = StoryObj<typeof Graphic>

export const Default: Story = {
	args: {
		data: [
			{
				priceUsd: '60265.1627278510716070',
				time: 1720951200000
			},
			{
				priceUsd: '60161.5937419422384996',
				time: 1720958400000
			},
			{
				priceUsd: '59764.3074742848904459',
				time: 1720965600000
			},
			{
				priceUsd: '60143.9552452059601015',
				time: 1720972800000
			},
			{
				priceUsd: '60075.8233595125010885',
				time: 1720980000000
			},
			{
				priceUsd: '59988.3901565550149080',
				time: 1720987200000
			},
			{
				priceUsd: '61196.9515624937590701',
				time: 1720994400000
			},
			{
				priceUsd: '60901.4471535249855487',
				time: 1721001600000
			},
			{
				priceUsd: '61425.8980180572683425',
				time: 1721008800000
			},
			{
				priceUsd: '62672.8204980454349806',
				time: 1721016000000
			},
			{
				priceUsd: '62832.7741603222576908',
				time: 1721023200000
			}
		],
		interval: 'd1',
		isLoading: false
	}
}
