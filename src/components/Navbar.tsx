import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const Navbar: React.FC = () => {
	const { isAuth, setIsAuth } = React.useContext<any>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	const notAuthLinks = [
		{
			title: "Home",
			link: "/home",
		},
		{
			title: "Login",
			link: "/login",
		},
		{
			title: "Register",
			link: "/register",
		},
	];
	const authLinks = [
		{
			title: "Home",
			link: "/home",
		},
		{
			title: "Short link",
			link: "/shortlinks",
		},
		{
			title: "Statistics",
			link: "/statistics",
		},
	];

	const logout = () => {
		if (window.confirm("Are you sure want to logout?")) {
			window.localStorage.removeItem("token_auth");
			navigate("/");
		}
	};

	React.useEffect(() => {
		if (window.localStorage.getItem("token_auth")) {
			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	}, [location]);

	return (
		<div className="h-[50px] bg-blue-100 flex flex-row p-1">
			{!isAuth ? (
				<>
					{notAuthLinks.map((item: any,index) => (
						<Link
                            key={index}
							to={item.link}
							className="flex py-1 px-4 border-blue-500 rounded border-2 mr-1 hover:bg-blue-200 text-blue-700"
						>
							<p className="self-center">{item.title}</p>
						</Link>
					))}
				</>
			) : (
				<>
					{authLinks.map((item: any,index) => (
						<Link
                        key={index}
							to={item.link}
							className="flex py-1 px-4 border-blue-500 rounded border-2 mr-1 hover:bg-blue-200 text-blue-700"
						>
							<p className="self-center">{item.title}</p>
						</Link>
					))}
					<button
						onClick={() => logout()}
						className=" py-1 px-4 border-red-500 rounded border-2 mr-1 hover:bg-red-200 text-red-500"
					>
						Logout
					</button>
				</>
			)}
		</div>
	);
};

export default Navbar;
