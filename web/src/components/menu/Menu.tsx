import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Divider, Drawer, IconButton, List, Theme, useTheme } from '@material-ui/core';

import RootMenuItem from './RootMenuItem';

import { goToDashboard } from '../../actions/app';
import { goToProfile, logout } from '../../actions/auth';
import { getCurrentUser } from '../../reducers/app';
import { goToProjects } from '../../actions/projects';

export const drawerWidthOpen: number = 240;

const useStyles = makeStyles((theme: Theme) => ({
	menuButton: {
		composes: 'flexRow',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	menuButtonOpen: {
		justifyContent: 'flex-end',
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidthOpen,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidthOpen,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
	},
	content: {
		composes: 'flexColumn spaceBetween flex1',
	},
	list: {
		composes: 'stretchSelf',
		padding: 0,
	},
}));

type MenuItemType = { name: string; label: string; selectedPathName?: string };
type Props = { pathName?: string };

const Menu = ({ pathName }: Props) => {
	// state
  const [open, setOpen] = useState<boolean>(false);

	// styles
	const classes = useStyles();

	const theme = useTheme();
	const dispatch = useDispatch();
	const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
	};
	
	const _showMenu = (menuName: string) => {
		switch (menuName) {
			case 'projects':
				dispatch(goToProjects());
				break;
			case 'profile':
				dispatch(goToProfile());
				break;
			default:
				dispatch(goToDashboard);
				break;
		}
	};

	const _logout = () => {
		dispatch(logout());
	};

	const user = useSelector(getCurrentUser);

	const MenuItem = ({ name, label, selectedPathName }: MenuItemType) => {
		return (
			<RootMenuItem
				name={name}
				label={label}
				onClick={_showMenu}
				selected={pathName === '/dashboard' + selectedPathName}
			/>
		);
	};

	return (
		<Drawer
			variant="permanent"
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			{/* -------------- Toggle Menu  -------------- */}
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={handleDrawerOpen}
				className={clsx(classes.menuButton, { [classes.hide]: open })}
			>
				<MenuIcon />
			</IconButton>
			<IconButton
				onClick={handleDrawerClose}
				className={clsx(classes.menuButton, classes.menuButtonOpen, { [classes.hide]: !open }, open)}
			>
				{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
			</IconButton>
			<Divider />
			<div className={classes.content}>
				<List className={classes.list}>
					<MenuItem
						name="user"
						label={user ? user.get('lastName') : 'user'}
					/>
					<Divider />

					<MenuItem
						name='profile'
						label='Profile'
						selectedPathName='/profile'
					/>

					<MenuItem
						name='projects'
						label='Projets'
						selectedPathName='/projects'
					/>
				</List>
				<List className={classes.list}>
					<Divider />
					{/* ---- Logout ----*/}
					<RootMenuItem
						name='logout'
						label="Déconnexion"
						onClick={_logout}
					/>
				</List>
			</div>
		</Drawer>
	);
};

export default Menu;