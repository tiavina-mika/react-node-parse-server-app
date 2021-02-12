import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import MenuItemIcon from './MenuItemIcon';

const useStyles = makeStyles({
	selected: {
		backgroundColor: 'rgba(0,0,0,0.08)',
		fontWeight: 'bold',
	},
});

type Props = {
	label: string;
	name: string;
	selected?: boolean;
	onClick?: (value: string) => void;
};
const RootMenuItem = ({ label, name, selected, onClick }: Props) => {
	// styles
	const classes = useStyles();

	/* eslint-disable @typescript-eslint/no-unused-expressions */
	const _onClick = () => {
		onClick ? onClick(name) : undefined;
	};

	return (
		<ListItem 
			button 
			key={label} 
			onClick={_onClick}
			className={selected ? classes.selected : undefined}
		>
			<ListItemIcon>
				<MenuItemIcon name={name} />
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItem>
	);
};

export default RootMenuItem;