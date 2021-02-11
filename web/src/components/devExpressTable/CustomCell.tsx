import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  cell: {
    composes: 'flexRow stretch center',
    height: 50,
  },
  right: {
    composes: 'justifyEnd',
  },
});

type Props = {
	value: any;
	alignment?: any;
	className?: string;
};
const CustomCell = ({ value, alignment, className }: Props) => {

  // styles
  const classes = useStyles();

  return (
    <div 
      className={clsx(
        classes.cell, 
        alignment && alignment === 'right' && classes.right,
        className,
      )}
    >
      {value}
    </div>
  );
};

export default CustomCell;