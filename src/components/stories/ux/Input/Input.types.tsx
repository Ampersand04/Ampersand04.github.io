import { valueType } from 'antd/es/statistic/utils'

export interface IInput {
	searchText: valueType
	handleInputChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}
