import useUser from "../context/UserContext/useUser.tsx";
import Button from "./Button.tsx";
import { useNavigate } from "react-router-dom";
import useTheme from "../context/ThemeContext/useTheme.tsx";
import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";

const Navbar = () => {
	const navigate = useNavigate();

	const { theme, toggleTheme } = useTheme();
	const { user, logout } = useUser();

	return (
		<div
			className={
				"flex h-full w-full items-center gap-6 border-b-[1px] px-4 py-1"
			}
		>
			<div
				className={
					"flex h-full w-4/12 cursor-pointer items-center justify-center text-2xl"
				}
				onClick={() => navigate("/")}
			>
				Parties
			</div>

			<div
				className={"flex h-full w-8/12 items-center justify-end gap-8"}
			>
				<Button onClick={() => toggleTheme()} style={{ border: false }}>
					{theme == "light" ? <MdLightMode /> : <MdDarkMode />}
				</Button>

				{user ? (
					<div className={"flex items-center gap-4"}>
						<div
							className={
								"flex cursor-pointer items-center justify-center text-lg"
							}
						>
							{user.username}
						</div>

						<Button onClick={logout} style={{ border: false }}>
							<MdLogout />
						</Button>
					</div>
				) : (
					<div className={"flex items-center gap-2"}>
						<Button
							onClick={() => navigate("/login")}
							className={"rounded-lg p-2"}
							style={{ border: false }}
						>
							Login
						</Button>
						<Button
							onClick={() => navigate("/register")}
							className={"rounded-lg p-2"}
							style={{ border: false }}
						>
							Register
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
