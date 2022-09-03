import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Login__page from "./pages/Login__page";
import { AuthContext } from "./context";
import Register__page from "./pages/Register__page";
import Navbar from "./components/Navbar";
import Home__page from "./pages/Home__page";
import Statistic__page from "./pages/Statistic__page";
import Redirect from "./components/Redirect";
import ShortLink__page from "./pages/ShortLink__page";

function App() {
	const [isAuth, setIsAuth] = React.useState<boolean>(false);
	return (
        //* HashRouter потому что в github-pages не работает BrowserRouter
		<HashRouter>
			<AuthContext.Provider value={{ isAuth, setIsAuth }}>
				<Navbar />
				<Routes>
					<Route path="/home" element={<Home__page />} />
					<Route path="/shortlinks" element={<ShortLink__page />} />
					<Route path="/login" element={<Login__page />} />
					<Route path="/register" element={<Register__page />} />
					<Route path="/statistics" element={<Statistic__page />} />
				</Routes>
			</AuthContext.Provider>
		</HashRouter>
	);
}

export default App;
