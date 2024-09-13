import React from 'react'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import styles from './home.module.scss'
import Header from '@/components/stories/ui/Header'
import CoinsTable from '@/components/stories/ui/CoinsTable'
import { PortfolioProvider } from '@/providers/PortfolioContext'

const Home: React.FC = () => {
	return (
		<PortfolioProvider>
			<Layout className={styles.layout}>
				<Header />
				<Content className={styles.content}>
					<CoinsTable />
				</Content>
			</Layout>
		</PortfolioProvider>
	)
}

export default Home
