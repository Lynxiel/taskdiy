import { AxiosInstance } from "axios";
import { TBoard } from "../store/modules/board";

export default function createBoardsApi(http: AxiosInstance){
	return {
		async all(){
			const response = await http.get<TBoard[]>('api/boards');
			return response;
		},
		async one(id: number){
			const response = await http.get<TBoard>(`api/boards/${id}`);
			return response;
		},
		async byUser(id: number){
			const response = await http.get<TBoard[]>(`api/boards/user/${id}`);
			return response;
		},
		
	}
}