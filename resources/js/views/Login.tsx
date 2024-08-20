import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useApi from '../hooks/useApi';
import {  AxiosError } from 'axios';
import useStorage from "..//hooks/useStorage";
import { useStore } from 'react-redux';
import { useAppDispatch } from '../store';
import useActions from '../hooks/useActions'

type TAuthErrorBag = {
	email: [],
	password: []
} | null

export default function SignIn() {

	const actions = useActions().auth;
	const dispatch = useAppDispatch();
	const [errors, setErrors] = React.useState<TAuthErrorBag>(null);

	async function handleSubmit  (event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrors(null);
		const data = new FormData(event.currentTarget);
		const [email , password] = [data.get('email') as string, data.get('password') as string];
		const result = await dispatch(actions.login({email,password}));
		console.log(result);
		
		if (  result.payload.errors  )
		{
			setErrors(result.payload.errors as TAuthErrorBag)
		}
		

	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
			>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				autoFocus
				error={errors?.email?true:false}
				helperText={errors?.email}
				/>
				<TextField
				margin="normal"
				required
				fullWidth
				name="password"
				label="Password"
				type="password"
				id="password"
				autoComplete="current-password"
				error={errors?.password?true:false}
				helperText={errors?.password}
				/>
				<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
				/>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				>
				Sign In
				</Button>
				<Grid container>
				<Grid item xs>
					<Link href="#" variant="body2">
					Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link href="#" variant="body2">
					{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
				</Grid>
			</Box>
			</Box>
		</Container>
	);
}