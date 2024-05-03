import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Today from './pages/Today'
import Memories from './pages/Memories'
import Login from './pages/Login'
import AuthProvider from './context/authProvider.jsx'
import RequireAuth from './components/RequireAuth'

import './App.css'
import DataProvider from './context/dataProvider.jsx'

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<DataProvider>
					<Navbar />
					<div className="body">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route element={<RequireAuth />}>
								<Route path="/today" element={<Today />} />
								<Route
									path="/memories"
									element={<Memories />}
								/>
							</Route>
						</Routes>
					</div>
				</DataProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}
export default App
