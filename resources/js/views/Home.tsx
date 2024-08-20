import { Container } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {authUser} from '../store/selectors'
function HomeView(){

	const user = useSelector(authUser)
	
	return <Container>
		<h1>Home page</h1>
		<p>Hello</p>
	</Container>
}

export default HomeView;