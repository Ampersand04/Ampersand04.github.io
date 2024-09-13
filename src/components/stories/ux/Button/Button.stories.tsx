import { StoryObj, type Meta } from '@storybook/react'
import Button from './Button'
import { options } from './options'

const meta: Meta<typeof Button> = {
	title: 'COMPONENTS/UX/Button',
	component: Button,
	tags: ['autodocs'],
	args: {
		children: 'Button'
	},
	argTypes: {
		children: {
			description: '',
			control: 'text'
		},
		type: {
			description: '**options:**',
			table: {
				type: {
					summary: options.type
						.map((option) => `'${option}'`)
						.join('|')
				}
			},
			control: 'select',
			options: options.type
		},
		color: {
			description: '**options:**',
			table: {
				type: {
					summary: options.color
						.map((option) => `'${option}'`)
						.join('|')
				}
			},
			control: 'select',
			options: options.color
		},
		size: {
			description: '**options:**',
			table: {
				type: {
					summary: options.sizes
						.map((option) => `'${option}'`)
						.join('|')
				}
			},
			control: 'select',
			options: options.sizes
		}
	}
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		type: 'default',
		color: 'blue',
		size: 'large'
	}
}

/**
 * Type Stories for Button component
 */

export const Primery: Story = {
	args: {
		...Default.args,
		type: 'primary'
	}
}

export const Link: Story = {
	args: {
		...Default.args,
		type: 'link'
	}
}
