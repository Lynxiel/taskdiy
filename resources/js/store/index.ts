import { configureStore } from '@reduxjs/toolkit'
import createAuthModule from './modules/auth'
import { TApiInstance } from '../api';
import { useDispatch } from 'react-redux';
import createBoardsModule from './modules/board';

export default function createStore(api: TApiInstance){
	const modules = {
		auth: createAuthModule(api.auth),
		boards: createBoardsModule(api.boards)
	}

	/* of course we try use mapped types later */

	const store = configureStore({
		reducer: {
			auth: modules.auth.reducer,
			boards: modules.boards.reducer,
		}
	})
	
	const actions = {
		auth: modules.auth.actions,
		boards : modules.boards.actions
	}

	return { store, actions };
}

type CreateStoreResult = ReturnType<typeof createStore>

export type RootStore = CreateStoreResult['store']
export type StoreActions = CreateStoreResult['actions']
export type StoreState = ReturnType<RootStore['getState']>
export type StoreDispatch = RootStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<StoreDispatch>()