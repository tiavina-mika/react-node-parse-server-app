import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  cell: {
    height: 50,
  },
  right: {
    composes: 'justifyEnd',
  },
});

type Props = {
	value: string | number | ReactNode;
	alignment?: any;
	className?: string;
};
const CustomCell = ({ value, alignment, className }: Props) => {

  // styles
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      className={clsx(
        classes.cell, 
        alignment && alignment === 'right' && classes.right,
        className,
      )}
    >
      {value}
    </Box>
  );
};

export default CustomCell;