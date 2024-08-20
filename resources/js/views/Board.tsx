import { Box, Button, Card, Container, Grid , Paper} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {authUser} from '../store/selectors';
import useRouteInt from '../hooks/useRouteInt';
import useApiRequest from '../hooks/useApiRequest';
import useApi from '../hooks/useApi';
import Loader from '../components/common/Loader'
import ListItem from '../components/board/ListItem';
import AddIcon from '@mui/icons-material/Add';
import CreateListItem from '../components/board/CreateListItem';
import { useWindowSize } from "@uidotdev/usehooks";


function BoardView(){

	const user = useSelector(authUser);
	const id = useRouteInt('id');
	const api = useApi().boards;
	const [request , execute ] = useApiRequest(api.one);
	const size = useWindowSize();


	useEffect(()=>{
		execute(id.value);
	},[id.value])
	
	return <Container style={{maxWidth: size.width as number, overflowX: 'scroll'}}>
		{request.pending && <Loader />}
		{request.success &&

			<Container maxWidth='xl'>
					<h1>Board "{request.data.data.name}"</h1>
					<CreateListItem board_id={request.data.data.id}></CreateListItem>
					<Grid container spacing={2} wrap='nowrap' whiteSpace='nowrap' mb={5}>
						{request.data.data.lists.map((listItem)=>
							<Grid item xs={4} md={3} key={listItem.id}>
								<Paper>
									<ListItem  item={listItem} />
								</Paper>
							</Grid>
						)}
					</Grid>

			</Container>
		}
		
	</Container>
}

export default BoardView;