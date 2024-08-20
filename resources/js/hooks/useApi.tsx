import { useContext } from "react";
import apiContext from "../contexts/apiContext";

export default function useApi(){
	const api = useContext(apiContext);

	if(api === null){
		throw new Error('some moron run app without api provider');
	}

	return api;
}