import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  imageContainer: {
    width: 60, 
    height: 50,
    composes: 'flexRow center',
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
    <div className={clsx(classes.imageContainer, className)}>
      { value 
        ? (
          <img 
            className={classes.image} 
            alt="" 
            src={value} 
          />
        )
        : children}
    </div>
  );
};

export default CustomImageCell;