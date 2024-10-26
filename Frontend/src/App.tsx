import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Layout from "./pages/Layout.tsx";
import useUser from "./context/UserContext/useUser.tsx";
import HomePage from "./pages/HomePage.tsx";

const AuthRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path={"/"} element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path={"/register"} element={<RegisterPage />} />
					<Route path={"/login"} element={<LoginPage />} />
				</Route>
			</Routes>
		</Router>
	);
};

const UserRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route path={"/"} element={<Layout />}>
					<Route index element={<HomePage />} />
				</Route>
			</Routes>
		</Router>
	);
};

const App = () => {
	const { user } = useUser();

	if (user) {
		return <UserRoutes />;
	}

	return <AuthRoutes />;
};

export default App;
