import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect: React.FC = () => {
	const navigate = useNavigate();
    React.useEffect(()=>{
        navigate('/home')
    },[])

	return <div></div>;
};

export default Redirect;
