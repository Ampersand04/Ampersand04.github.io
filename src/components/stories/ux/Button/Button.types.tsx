import { ButtonType } from 'antd/es/button'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import { MouseEventHandler } from 'react'

export interface IButton {
	onClick?: MouseEventHandler<HTMLElement> | undefined

	children?: React.ReactNode
	type?: ButtonType
	color?: string
	size?: SizeType
}

export interface Options {
	type: ButtonType[]
	color: string[]
	sizes: string[]
}
