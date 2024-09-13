import { Route, Routes } from 'react-router'
import Home from './pages/home/home'
import CoinPage from './pages/coinPage/coinPage'

function App() {
	return (
		<Routes>
			<Route path="/" Component={() => <Home />}></Route>
			<Route path="/coin/:id" Component={() => <CoinPage />}></Route>
		</Routes>
	)
}

export default App
