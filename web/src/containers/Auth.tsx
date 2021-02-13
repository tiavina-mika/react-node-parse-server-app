import { ReactNode } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Theme } from '@material-ui/core';
import CustomCard from '../components/CustomCard';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
	},
	card: {
		minWidth: 300,
		maxWidth: '40vw',
	},
	content: {
		composes: 'flexColumn center',
		padding: 30,
	},
	action: {
		backgroundColor: 'transparent',
	},
	okBtn: {
		width: '100%',
		marginLeft: 0,
	},
	otherActionsuButton: {
		width: '100%',
		marginTop: 10,
	},
}));

type Props = { 
	children: ReactNode;
	title?: string;
	onSubmit?: () => void;
	submitLabel?: string;
	onSecondarySubmit?: () => void;
	secondaryButtonLabel?: string;
};
const Auth = ({ 
	children,
	title,
	onSubmit,
	submitLabel,
	onSecondarySubmit,
	secondaryButtonLabel,
}: Props) => {

	const classes = useStyles();

	const otherActions: ReactNode = (
		<Button className={classes.otherActionsuButton} onClick={onSecondarySubmit}>
			{secondaryButtonLabel}
		</Button>
	);

	return (
		<Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
			<CustomCard
				title={title}
				content={children}
				rootClassName={classes.card}
				contentClassName={classes.content}
				okAction={onSubmit}
				okLabel={submitLabel}
				actionClassName={classes.action}
				okBtnClassName={classes.okBtn}
				withActionButtons
				okBtnVariant="contained"
				otherActions={otherActions}
			/>
		</Box>
	);
};

export default Auth;
