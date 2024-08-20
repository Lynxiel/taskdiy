import React from 'react';
import { Link, useRoutes } from "react-router-dom"
import routes from "../router"
import { useSelector } from "react-redux";
import { authUser } from "../store/selectors";
import AppMenu from './AppMenu';
import AppFooter from './AppFooter';
import { CssBaseline } from '@mui/material';

export default function App(){
	const page = useRoutes(routes);
	const user = useSelector(authUser)
	
	return <>
		<CssBaseline />
		<AppMenu/>
		<main>
			{ page }
		</main>
		<footer>
			<AppFooter />
		</footer>
	</>
}