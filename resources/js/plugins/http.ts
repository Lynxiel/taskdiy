import axios from "axios";

export default function createHttpPlugin(baseURL: string){
	const http = axios.create({
		baseURL, 
	})

	http.defaults.withCredentials = true;
	http.defaults.withXSRFToken = true;

	return http;
}