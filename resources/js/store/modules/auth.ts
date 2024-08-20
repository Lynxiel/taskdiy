import { PayloadAction, createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TUser } from '../../types/data'
import { TApiInstance } from '../../api'
import { AxiosError } from 'axios'

type AuthState = {
	user: TUser | null, 
	ready: boolean,
}

type UserCredentials = {
	email: string,
	password: string,
}

export default function createAuthModule(authApi: TApiInstance['auth']){
	const initialState: AuthState = {
		user: null,
		ready: false,
	}

	const authSlice = createSlice({
		name: 'auth',
		initialState,
		reducers: {
		
			logout : (state)=>{
				state.user = null;
			}
		},
		extraReducers(builder) {
			builder
			.addCase(init.pending, (state) => {
				state.ready = false
			})
			.addCase(init.fulfilled, (state, action) => {
				state.user = action.payload;
				state.ready = true;
			})
			.addCase(init.rejected, (state) => {
				state.user = null;
				state.ready = true;
			})

			.addCase(login.fulfilled, (state, action:PayloadAction<TUser>) => {
				state.user = action.payload;
			})
			
		}
	})


	const init = createAsyncThunk('auth/init', async (_, thunkApi) => {
		const result =  await authApi.check();
		return result.data.id?result.data :null
		
	})

	const logout = createAsyncThunk('auth/logout', async () => {
		const result =  await authApi.logout();
		return result.data;
		
	})


	const login = createAsyncThunk('auth/login', async ({email, password}: UserCredentials ,thunkApi) => {
		try{
			const result = await authApi.login({email, password});
			return result.data;
		}catch(e){			
			return thunkApi.rejectWithValue(e.response.data)
		}
		
	})



	return {
		reducer: authSlice.reducer,
		actions: {
			init , login, logout
		}
	};
}


