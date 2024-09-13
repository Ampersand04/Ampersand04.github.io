import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const rootElement = document.getElementById('root')

export const queryClient = new QueryClient()

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	)
} else {
	console.error('Root element not found')
}
