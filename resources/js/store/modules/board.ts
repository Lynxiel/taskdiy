import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TApiInstance } from '../../api'
import { AxiosError } from 'axios'
import { TUser } from '../../types/data'



export type TBoard = {
	id: number,
	name: string,
	lists: TBoardList[],
}
export type TBoardList = {
	id: number,
	name: string,
	description: string,
}

type TBoardsState ={
	ready: boolean,
	boards : TBoard[]
}

export default function createBoardsModule(boardsApi: TApiInstance['boards']){
	const initialState:TBoardsState = {
		ready: false,
		boards:[],
	}

	const authSlice = createSlice({
		name: 'board',
		initialState,
		reducers: {
	
		},
		extraReducers(builder) {
			builder
			.addCase(loadUserBoards.pending, (state)=>{
				state.ready = false;
				state.boards=[]
			})
			.addCase(loadUserBoards.fulfilled, (state, action:PayloadAction<TBoard[]>) => {
				state.boards = action.payload;
				state.ready = true;
			})
		
			
		}
	})


	const loadUserBoards = createAsyncThunk<TBoard[], number>('boards/byUser', async ( id ) => {
		const result = await boardsApi.byUser(id);
		return result.data as TBoard[];
	})

	


	return {
		reducer: authSlice.reducer,
		actions: {
			loadUserBoards 
		}
	};
}


