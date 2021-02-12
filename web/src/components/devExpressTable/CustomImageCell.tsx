import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  imageContainer: {
    width: 60, 
    height: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});


type Props = {
	value: any;
	children: ReactNode;
	className: string;
};
const CustomImageCell = ({ value, className, children }: Props) => {
  // styles
  const classes = useStyles();

  return (
    <Box 
      className={clsx(classes.imageContainer, className)}
      display="flex"
      alignItems="center"
    >
      { value 
        ? (
          <img 
            className={classes.image} 
            alt="" 
            src={value} 
          />
        )
        : children}
    </Box>
  );
};

export default CustomImageCell;