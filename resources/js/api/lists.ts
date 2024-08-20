import { AxiosInstance } from "axios";
import { TBoard, TBoardList } from "../store/modules/board";

export default function createBoardListsApi(http: AxiosInstance){
	return {
		async all(boardId:number){
			const response = await http.get<TBoardList[]>(`api/boards/${boardId}/lists`);
			return response;
		},

		async one(boardId:number, id:number){
			const response = await http.get<TBoardList[]>(`api/boards/${boardId}/lists/${id}`);
			return response;
		},

		async store(boardId:number, fields: Pick<TBoardList, 'name' | 'description'>){
			const response = await http.post<TBoardList>(`api/boards/${boardId}/lists`, fields);
			return response.data;
		},

		async update(boardId:number, fields: TBoardList){
			const response = await http.put<TBoardList>(`api/boards/${boardId}/lists/${fields.id}`, fields);
			return response.data;
		},

		async delete(boardId:number, id:number){
			const response = await http.delete<TBoardList[]>(`api/boards/${boardId}/lists/${id}`);
			return response;
		},
		
		
	}
}