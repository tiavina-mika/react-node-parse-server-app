import React from 'react';
import CurrentUserIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import ImageIcon from '@material-ui/icons/Image';

type Props = { name: string };
const MenuItemIcon = ({ name }: Props) => {

	let icon = null;
	switch (name) {
		case 'user':
			icon = <CurrentUserIcon />; break;
		case 'profile':
			icon = <CurrentUserIcon />; break;	
		case 'projects':
			icon = <ImageIcon />; break;
		case 'logout':
			icon = <LogoutIcon />; break;
		default:
			break;
	}

	return icon;
};

export default MenuItemIcon;