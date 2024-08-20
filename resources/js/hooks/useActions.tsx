import { useContext } from "react";
import actionsContext from "../contexts/actionsContext";

export default function useActions(){
	const actions = useContext(actionsContext);

	if(actions === null){
		throw new Error('some moron run app without store actions provider');
	}

	return actions;
}