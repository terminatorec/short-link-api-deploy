import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context";
import { Navigate, useNavigate } from "react-router-dom";

const Login__page: React.FC = () => {
	const { isAuth, setIsAuth } = React.useContext<any>(AuthContext);
	const navigate = useNavigate();

	const {
		register, //это свойство позволяет регистрировать различные поля для формы
		formState: { errors, isValid },
		handleSubmit,
		reset, //метод для очистки инпутов после отправки
	} = useForm({ mode: "all" });

	const onSubmit = async (data: any) => {
		reset();

        //* в запросах я использовал свой прокси сервер https://cors-anywhere666.herokuapp.com
        //* потому что после деплоя приложения я не мог обращаться к апи http://79.143.31.216/
        //* были ошибки cors + mixed content (эта ошибка возникает потому что сервер без сертификата, 
        //* был бы https не пришлось бы использовать прокси)
        
		let url = `https://cors-anywhere666.herokuapp.com/http://79.143.31.216/login`;

		await fetch(url, {
			method: "POST",
			body: new URLSearchParams({
				username: data.username,
				password: data.password,
			}),
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
			},
		})
			.then((res: any) => {

                //* проверка на запрос
                if(res.ok === true){
                    return res.text();
                }
			})
			.then((response: any) => {

				//* после получения ответа в localstorage записывается токен для других запросов
				if (response) {
					let info = JSON.parse(response);
					window.localStorage.setItem(
						"token_auth",
						info.access_token
					);
					setIsAuth(true);
					navigate(`/home`);
				}
			})
			.catch((err: any) => console.log("❌ error", err));
	};

    //* если человек уже залогинился, то ему в роуте /login делать нечего. будет редирект на /home
	if (isAuth) {
		return <Navigate to="/home" />;
	}

	return (
		<div>
			<h2 className="text-center text-2xl p-4">Login</h2>
			<div className="flex flex-col py-2 px-5 w-[50%] min-w-[300px] max-w-[500px] mx-auto text-lblue bg-white rounded shadow-md">
				<form
					className="flex flex-col"
					onSubmit={handleSubmit(onSubmit)}
				>
					<label>
						<p>
							Username{" "}
							{!errors.username ? (
								<span className="text-white"></span>
							) : (
								<span className="text-red-400">
									{String(errors?.username?.message) ||
										"error"}
								</span>
							)}
						</p>
						<input
							className="p-3 my-1 rounded text-black w-full outline-none border-2 border-lblue/80"
							type="text"
							placeholder="Username..."
							{...register("username", {
								pattern: {
									value: /^[A-Za-z0-9\_\-]+$/,
									message: "use only A-Z a-z 0-9 _ -",
								},
								required: "required",
								minLength: {
									value: 5,
									message: "min length is 5",
								},
								maxLength: {
									value: 25,
									message: "max length is 25",
								},
							})}
						/>
					</label>

					<label>
						<p>
							Password{" "}
							{!errors.password ? (
								<span className="text-white"></span>
							) : (
								<span className="text-red-400">
									{String(errors?.password?.message) ||
										"error"}
								</span>
							)}
						</p>
						<input
							className="p-3 my-1 rounded text-black w-full outline-none border-2 border-lblue/80"
							type="text"
							placeholder="Password..."
							{...register("password", {
								pattern: {
									value: /^[A-Za-z0-9\_\-\!\(\)]{1,}$/,
									message: "use only A-Z a-z 0-9 _ - ! ( )",
								},
								required: "required",
								minLength: {
									value: 8,
									message: "min length is 8",
								},
								maxLength: {
									value: 20,
									message: "max length is 20",
								},
							})}
						/>
					</label>
					<button
						className="cursor-pointer px-4 py-2 my-4 border-[1px] text-orange border-orange hover:bg-orange hover:text-white rounded"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login__page;
