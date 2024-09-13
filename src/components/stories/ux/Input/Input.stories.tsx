import { StoryObj, type Meta } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
	title: 'COMPONENTS/UX/Input',
	component: Input,
	tags: ['autodocs']
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}
