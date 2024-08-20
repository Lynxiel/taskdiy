import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react'
import { authReady, authUser } from '../store/selectors';

interface AuthGuardProps{
	children: ReactNode,
	guestMode?: boolean
}

/*
	guestOnly = true -> страница доступна только гостям, от авторизованных закрыта (login, reg)
	guestOnly = false -> страница доступна только авторизованным
*/

function AuthGuard({ children, guestMode = false }: AuthGuardProps){
	const ready = useSelector(authReady);
	const user = useSelector(authUser);	

	if(!ready){
		return <div>Loading...</div>;
	}

	if(!guestMode && user == null){
		return <Navigate to="/login" />
	}

	if(guestMode && user != null){
		return <Navigate to="/" />
	}

	return <>{ children }</>;
}

export default AuthGuard;