import React, { Fragment, useState, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';

import SnackbarContentWrapper from '../components/SnackbarContentWrapper';

import { closeMessage } from '../actions/app';
import {
	// getCurrentUser,
	getLoading,
	getMessage, getMessageVariant, getTitle,
} from '../reducers/app';
import Menu from '../components/menu/Menu';

export const drawerWidthOpen: number = 240;
export const drawerWidthClosed: number = 70;

const useStyles = makeStyles((theme: Theme) => ({
	main: {
		composes: 'flexRow',
	},
	children: {
		composes: 'flexCenter flex1',
		padding: 12,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer * 10,
		color: '#fff',
	},
	menuButton: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	content: {
		composes: 'flexRow center flexCenter flex1',
		minHeight: '100vh',
		backgroundColor: blue[600],
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
}));

/* eslint-disable react/jsx-closing-tag-location */
type Props = { children: ReactNode };
const Dashboard = ({ children }: Props) => {
	// state
	const [backdropOpened, setBackdropOpened] = useState<boolean>(false);

	// styles
	const classes = useStyles();

	// dispatch
	const dispatch = useDispatch();

	// selectors
	const title = useSelector(getTitle);
	const message = useSelector(getMessage);
	const variant = useSelector(getMessageVariant);
	const loading = useSelector(getLoading);
	// const user = useSelector(getCurrentUser);

	// -------------------------------------//
	// ------------ backdrop ---------------//
	// -------------------------------------//
	
	const _handleCloseBackdrop = () => {
		setBackdropOpened(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setBackdropOpened(loading);
		}, 200);

		return () => {
			setBackdropOpened(false);
		};
	}, [loading]);

	const pathName = window.location.pathname;

	return (
		<>
			<Helmet>
				<title>
          {title || 'MIKA'}
        </title>
			</Helmet>

			<main className={classes.main}>
				{/* ------------ Menu ------------ */}
			  <Menu pathName={pathName} />
				{/* {user && <Menu pathName={pathName} />} */}

				{/* ------------ Main Content ------------ */}
				<div className={classes.content}>
					{ children }
				</div>
			</main>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={message != null}
				autoHideDuration={4000}
				onClose={() => dispatch(closeMessage())}
			>
				<SnackbarContentWrapper
					variant={variant}
					message={message || ''}
				/>
			</Snackbar>

			<Backdrop
				className={classes.backdrop}
				open={backdropOpened}
				onClick={_handleCloseBackdrop}
			>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
};

export default Dashboard;