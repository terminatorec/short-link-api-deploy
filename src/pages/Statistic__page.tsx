import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Statistic__page: React.FC = () => {
	const [linksArr, setLinksArr] = React.useState<any>();
	const [filter, setFilter] = React.useState<string>("desc_short");
	const [pages, setPages] = React.useState<number>(5);
	const [currentPage, setCurrentPage] = React.useState<number>(0);
	const [arrayPages, setArrayPages] = React.useState<any[]>([1, 2, 3, 4, 5]);
	const [arrayPagesAll, setArrayPagesAll] = React.useState<any[]>([
		1, 2, 3, 4, 5,
	]);
	const [itemsPerPage, setItemPerPage] = React.useState<number>(10);
	const [isLoaded, setLoaded] = React.useState<boolean>(false);
	const [inputPage, setInputPage] = React.useState<string>("5");
	const [showTooltip, setShowTooltip] = React.useState<boolean>(false);
	const [tooltipXY, setTooltipXY] = React.useState<any>({
		t: 0,
		l: 0,
	});

	const getLinks = (param?: any) => {
		let url = "https://cors-anywhere666.herokuapp.com/http://79.143.31.216/statistics?";
		let token = "Bearer " + window.localStorage.getItem("token_auth");
		setLoaded(false);
		fetch(
			encodeURI(
				url +
					new URLSearchParams(
						param
							? { order: "asc_short" }
							: {
									order: filter,
									offset: (
										currentPage * itemsPerPage
									).toString(),
									limit: itemsPerPage.toString(),
							  }
					)
			),
			{
				method: "GET",
				headers: {
					Authorization: token,
					"Content-type": "application/json",
				},
			}
		)
			.then((res: any) => res.text())
			.then((response: any) => {
				let r = JSON.parse(response);
				let count =
					r.length / itemsPerPage > 1
						? Math.ceil(r.length / itemsPerPage)
						: 0;
				let newArray = [];
				if (count) {
					setPages(count);
					for (let i = 0; i < count; i++) {
						newArray.push(i);
					}
				}
				if (param) {
					setArrayPages(newArray.slice(0, 15));
					setArrayPagesAll(newArray);
				} else {
					setLinksArr(r);
				}
				setLoaded(true);
			})
			.catch((err: any) => console.log("❌ error", err));
	};

	const changePage = (page: number) => {
		if (page > 7 && page + 7 < pages) {
			setArrayPages(arrayPagesAll.slice(page - 7, page + 8));
		} else if (page + 7 >= pages) {
			setArrayPages(arrayPagesAll.slice(pages - 15, pages));
		} else {
			setArrayPages(arrayPagesAll.slice(0, 15));
		}
	};

	const goToPage = (page: number) => {
		if (page > 0 && page <= pages) {
			changePage(page - 1);
			setCurrentPage(page - 1);
		} else {
			alert("Wrong input");
		}
	};

	const showToolTip = (e: any) => {
		let t = e.clientY - 90;
		let l = e.clientX;
		setTooltipXY({ t: t, l: l });
		setShowTooltip(true);
		window.setTimeout(() => {
			setShowTooltip(false);
		}, 1000);
	};

	React.useEffect(() => {
		getLinks();
	}, [currentPage]);

	React.useEffect(() => {
		getLinks();
		setCurrentPage(0);
        changePage(0);
	}, [filter]);

	React.useEffect(() => {
		getLinks("all");
	}, []);

	const buttons = [
		{
			title: "Original link",
			desc: "desc_target",
			asc: "asc_target",
		},
		{
			title: "Short link",
			desc: "desc_short",
			asc: "asc_short",
		},
		{
			title: "Visits",
			desc: "desc_counter",
			asc: "asc_counter",
		},
	];

	if (!isLoaded) {
		return <p className="p-4">Loading...</p>;
	}

	return (
		<div className="p-4 relative">
			<div className="border-l-2 border-t-2 border-b-2 border-black">
                <div className="grid grid-cols-3">
                    {buttons.map((item: any,index) => (
                        <div
                            key={index}
                            className="p-2 border-r-2 last:border-r-1 border-b-2 flex items-center border-black cursor-pointer hover:bg-blue-100"
                            onClick={() =>
                                setFilter(
                                    filter == item.desc ? item.asc : item.desc
                                )
                            }
                        >
                            <p>{item.title}</p>
                            {filter == item.desc ? (
                                <MdKeyboardArrowDown size={25} />
                            ) : filter == item.asc ? (
                                <MdKeyboardArrowUp size={25} />
                            ) : (
                                ""
                            )}
                        </div>
                    ))}

                </div>
				{linksArr
					? linksArr.map((item: any,index:any) => (
							<div key={index} className="grid grid-cols-3">
								<p
									onClick={(e) => {
										showToolTip(e);
										navigator.clipboard.writeText(
											item.target
										);
									}}
									className="p-2 border-r-2 border-black cursor-pointer hover:text-blue-500"
								>
									{item.target}
								</p>
								<p
									onClick={(e) => {
										showToolTip(e);
										navigator.clipboard.writeText(
											`http://79.143.31.216/s/${item.short}`
										);
									}}
									className="p-2 border-r-2 border-black cursor-pointer hover:text-blue-500"
								>
									http://79.143.31.216/s/{item.short}
								</p>
								<p className="p-2 border-r-2 border-black">
									{item.counter}
								</p>
							</div>
					  ))
					: ""}
			</div>
			<div className="flex p-2 justify-center items-center mt-[50px]">
				{arrayPages.map((item: number, index: number) => (
					<div
						key={index}
						onClick={() => {
							changePage(item);
							setCurrentPage(item);
						}}
						style={
							currentPage == item
								? { background: "rgb(191, 219, 254)" }
								: {}
						}
						className="cursor-pointer p-1 px-2 border-blue-500 bg-blue-50 min-w-[30px] text-center text-blue-500 hover:bg-blue-100 mr-1 rounded border-b-2"
					>
						{item + 1}
					</div>
				))}
			</div>
            <div className="flex justify-center items-center mt-4">
				<div className="ml-4 text-sm">
					<input
						value={inputPage}
						onChange={(e) => setInputPage(e.target.value)}
						className="w-[120px] border-b-2 outline-none border-blue-500  px-2 py-1"
						type="text"
						placeholder="Input page..."
					/>
					<button
						onClick={() => goToPage(Number(inputPage))}
						className="hover:bg-blue-100 border-2 border-blue-500 px-2 py-1"
					>
						Go
					</button>
				</div>
				<p className="text-right text-sm ml-2">Total pages: {pages}</p>
            </div>

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

export default Statistic__page;
