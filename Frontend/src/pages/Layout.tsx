import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

const Layout = () => {
	return (
		<div className={"h-screen w-full overflow-hidden"}>
			<div className={"fixed h-[50px] w-full"}>
				<Navbar />
			</div>

			<div className={"mt-[51px] h-[calc(100%-51px)] w-full"}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
