import { AxiosInstance } from "axios";
import creatPostsApi from "./posts";
import createAuthApi from "./auth";
import createBoardsApi from "./boards";
import createBoardListsApi from "./lists";

export default function createApi(http: AxiosInstance){
	const api = {
		posts: creatPostsApi(http),
		auth: createAuthApi(http),
		boards: createBoardsApi(http),
		lists: createBoardListsApi(http),

	}

	return api;
}

export type TApiInstance = ReturnType<typeof createApi>;