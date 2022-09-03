import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context";
import { Navigate, useNavigate } from "react-router-dom";

const Register__page: React.FC = () => {
	const { isAuth, setIsAuth } = React.useContext<any>(AuthContext);
	const navigate = useNavigate();

	const {
		register, //это свойство позволяет регистрировать различные поля для формы
		formState: { errors, isValid },
		handleSubmit,
		reset, //метод для очистки инпутов после отправки
	} = useForm({ mode: "all" });

	const onSubmit = (data: any) => {
		reset();
		const { password, username } = data;
		let url = "https://cors-anywhere666.herokuapp.com/http://79.143.31.216/register?";

		fetch(url + new URLSearchParams({
            username: username,
            password: password,

        }),{
		    method: 'POST',
		})
		.then((res:any)=>{
            if (res.ok) {
                window.localStorage.setItem("token_auth", 'token123');
                setIsAuth(true)
                navigate(`/home`)
            } else {
                alert("не удалось зарегистрироваться");
            }
        })
        .catch((err:any)=>console.log('❌ error',err))
	};

	if (isAuth) {
		return <Navigate to="/home" />;
	}

	return (
		<div>
			<h2 className="text-center text-2xl p-4">Register</h2>
			<div className="flex py-2 flex-col px-5 w-[50%] min-w-[300px] max-w-[500px] mx-auto text-lblue bg-white rounded shadow-md">
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
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register__page;
