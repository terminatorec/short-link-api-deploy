import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const ShortLink__page: React.FC = () => {
	const { isAuth, setIsAuth } = React.useContext<any>(AuthContext);
	const [link, setLink] = React.useState<string>("");
	const [shortLink, setShortLink] = React.useState<string>("");
    const [showTooltip, setShowTooltip] = React.useState<boolean>(false);
	const [tooltipXY, setTooltipXY] = React.useState<any>({
		t: 0,
		l: 0,
	});

    const showToolTip = (e: any) => {
		let t = e.clientY - 90;
		let l = e.clientX;
		setTooltipXY({ t: t, l: l });
		setShowTooltip(true);
		window.setTimeout(() => {
			setShowTooltip(false);
		}, 1000);
	};

	const submit = () => {
		let url = "https://cors-anywhere666.herokuapp.com/http://79.143.31.216/squeeze?";
        let newLink = 'link='+link
		let token = "Bearer " + window.localStorage.getItem("token_auth");

		fetch(encodeURI(url + newLink),
			{
				method: "POST",
				headers: {
					Authorization: token,
					"Content-type": "application/json",
				},
			}
		)
        .then((res:any)=>res.text())
			.then((response: any) => {
                let r = JSON.parse(response)
                setShortLink('http://79.143.31.216/s/'+ r.short)
                setLink("")
			})
			.catch((err: any) => console.log("❌ error", err));
	};

	return (
		<div className="flex flex-col p-4 relative">
			<div>
				<input
					value={link}
					onChange={(e) => setLink(e.target.value)}
					className="p-3 text-black w-full outline-none "
					type="text"
					placeholder="Your link..."
				/>
				<button
					onClick={() => submit()}
					className="py-2 w-full px-3 border-blue-500 bg-none text-blue-500  hover:bg-blue-100 border-2"
				>
					Get short link
				</button>
			</div>
			<div className="flex w-fit mx-auto my-4 text-blue-500">
				<AiOutlineArrowDown size={30} />
				<AiOutlineArrowDown size={30} />
				<AiOutlineArrowDown size={30} />
			</div>
			<p 
            onClick={(e) => {
                if(shortLink){
                    showToolTip(e);
                    navigator.clipboard.writeText(
                        shortLink
                    );
                }
            }}
            className="text-blue-500 text-center hover:text-blue-300 cursor-pointer">
				{shortLink?shortLink:''}
			</p>
            {showTooltip && (
				<div
					style={{ top: tooltipXY.t, left: tooltipXY.l }}
					className="absolute p-2 bg-blue-100 rounded shadow-md"
				>
					<p>Copied!</p>
				</div>
			)}
		</div>
	);
};

export default ShortLink__page;
