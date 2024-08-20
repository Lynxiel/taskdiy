import { AxiosInstance } from "axios";
import { AppStorage } from "../plugins/storage";

export default function initRequestAuthToken(
	http: AxiosInstance,
	storage: AppStorage
){
	http.interceptors.request.use(config => {
		const token = storage.getItem(StorageConfig.authTokenKey);

		if(token){
			config.headers.Authorization = `Bearer ${token}`
		}
		
		return config;
	})
}