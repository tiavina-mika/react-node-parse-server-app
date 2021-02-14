// import { ReactNode } from 'react';

// import { makeStyles } from '@material-ui/core/styles';

// import { Box, Button, Theme } from '@material-ui/core';
// import CustomCard from '../components/CustomCard';

// const useStyles = makeStyles((theme: Theme) => ({
// 	root: {
// 		backgroundColor: theme.palette.primary.main,
// 		height: '100vh',
// 	},
// 	card: {
// 		minWidth: 300,
// 		maxWidth: '40vw',
// 	},
// 	content: {
// 		composes: 'flexColumn center',
// 		padding: 30,
// 	},
// 	action: {
// 		backgroundColor: 'transparent',
// 	},
// 	okBtn: {
// 		width: '100%',
// 		marginLeft: 0,
// 	},
// 	otherActionsuButton: {
// 		width: '100%',
// 		marginTop: 10,
// 	},
// }));




import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Theme } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
		backgroundColor: theme.palette.primary.main,
		height: '100vh',
  },
	card: {
		minWidth: 300,
		maxWidth: '30vw',
	},
	button: {
		width: '100%',
	},
	secondaryButton: {
		marginTop: theme.spacing(1),
	},
	actions: {
		composes: 'flexRow',
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

  return (
		<Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
			<Card className={classes.card}>
				<CardActionArea>
					<CardContent>
						<Box display="flex" justifyContent="center">
							<Typography gutterBottom variant="h5" component="h2">
								{title}
							</Typography>							
						</Box>
							<Box>
								{children}
							</Box>
					</CardContent>
				</CardActionArea>
				<CardActions className={classes.actions}>
					<Button color="primary" onClick={onSubmit} variant="contained" className={classes.button}>
						{submitLabel}
					</Button>
					<Button onClick={onSecondarySubmit} className={clsx(classes.button, classes.secondaryButton)}>
						{secondaryButtonLabel}
					</Button>
				</CardActions>
			</Card>
		</Box>
  );
};

export default Auth;
