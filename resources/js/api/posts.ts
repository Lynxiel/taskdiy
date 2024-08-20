import { AxiosInstance } from "axios";
import { TPost, WithUser } from "../types/data";

export default function createPostsApi(http: AxiosInstance){
	return {
		async all(){
			const response = await http.get<WithUser<TPost>[]>('/posts');
			return response.data;
		},
		async one(id: number){
			const response = await http.get<WithUser<TPost>>(`/posts/${id}`);
			return response.data;
		},
		async store(fields: Pick<TPost, 'title' | 'url' | 'content'>){
			const response = await http.post<TPost>('/posts', fields);
			return response.data;
		},
		async update(id: number, fields: Pick<TPost, 'title' | 'url' | 'content'>){
			const response = await http.put<TPost>(`/posts/${id}`, fields);
			return response.data;
		}
	}
}