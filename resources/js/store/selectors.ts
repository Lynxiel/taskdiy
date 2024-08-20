import { StoreState } from ".";

export const authUser = (state: StoreState) => state.auth.user;
export const authReady = (state: StoreState) => state.auth.ready;
export const userBoards = (state: StoreState) => state.boards.boards;