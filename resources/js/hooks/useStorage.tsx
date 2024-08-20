import { useContext } from "react";
import storageContext from "../contexts/storageContext";

export default function useStorage(){
	const storage = useContext(storageContext);

	if(storage === null){
		throw new Error('some moron run app without storage provider');
	}

	return storage;
}