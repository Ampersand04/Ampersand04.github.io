import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend
} from 'recharts'
import { IGraphic } from './Graphic.types'
import { formatNumber } from '@/utils/formatNumber'
import { Select, Typography } from 'antd'
import styles from './Graphic.module.scss'
import { Option } from 'antd/es/mentions'

export const Graphic: React.FC<IGraphic> = ({
	data,
	handleIntervalChange,
	isLoading
}) => {
	return (
		<div className={styles.graphic}>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: '20px' }}
			>
				Price Change (24h | 12h | 1h):&nbsp;
			</Typography.Title>
			<Select
				defaultValue="h2"
				style={{ width: 150, marginBottom: '20px' }}
				onChange={handleIntervalChange}
			>
				<Option value="h2">1 Day</Option>
				<Option value="h1">12 Hours</Option>
				<Option value="m5">1 Hour</Option>
			</Select>

			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={isLoading ? undefined : data}>
					<CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
					<XAxis
						dataKey="time"
						tickFormatter={(time) => {
							return new Date(time).toLocaleString(undefined, {
								hour: '2-digit',
								minute: '2-digit',
								day: 'numeric',
								month: 'short'
							})
						}}
						tick={{ fontSize: 12 }}
					/>
					<YAxis
						tickFormatter={(value) => formatNumber(value)}
						width={80}
						tick={{ fontSize: 12 }}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: '#333',
							color: '#fff',
							borderRadius: '10px'
						}}
						labelStyle={{ color: '#fff' }}
						labelFormatter={(label) =>
							`Time: ${new Date(label).toLocaleString()}`
						}
						formatter={(value: number) => [
							`Price: $${formatNumber(value)}`,
							''
						]}
					/>
					<Legend />
					<Line
						type="monotone"
						dataKey="priceUsd"
						stroke="#82ca9d"
						strokeWidth={3}
						dot={{ r: 4 }}
						activeDot={{ r: 8 }}
						animationDuration={500}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default Graphic
