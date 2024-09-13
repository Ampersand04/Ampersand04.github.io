import { IInput } from './Input.types'
import { Input as AntInput } from 'antd'
import styles from './Input.module.scss'

export const Input: React.FC<IInput> = ({ searchText, handleInputChange }) => {
	return (
		<AntInput
			className={styles.input}
			placeholder="Search by coin name"
			allowClear
			size="large"
			value={searchText}
			onChange={handleInputChange}
		/>
	)
}

export default Input
