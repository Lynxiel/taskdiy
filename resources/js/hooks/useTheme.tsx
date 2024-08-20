import { useContext } from "react";
import themeContext from "../contexts/actionsContext";

export default function useActions(){
	const theme = useContext(themeContext);

	if(theme === null){
		throw new Error('some moron run app without theme provider');
	}

	return theme;
}