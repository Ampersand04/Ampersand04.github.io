import { Button as AntButton } from 'antd'
import { IButton } from './Button.types'
import { clsx } from 'clsx'
import styles from './Button.module.scss'

export const Button: React.FC<IButton> = ({
	onClick,
	children = 'Button',
	type = 'primary',
	color = 'red',
	size = 'middle'
}) => {
	return (
		<AntButton
			onClick={onClick}
			type={type}
			color={color}
			size={size}
			className={clsx(styles[type], styles[color])}
		>
			{children}
		</AntButton>
	)
}

export default Button
