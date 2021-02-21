import React, { ReactNode, useCallback } from 'react';
import { IconButton as MUIIconButton } from '@material-ui/core';
import ViewListIcon from '@material-ui/icons/ViewList';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

type Props = { 
  onClick: () => void; 
  color?: 'default' | 'primary'| 'secondary'; 
  className?: string; 
  type?: string ;
  size? : 'small' | 'medium';
};

const IconButton = ({ 
  onClick, 
  color = 'primary', 
  className, 
  type, 
  size = 'medium',
}: Props) => {

  const getIcon: () => ReactNode = useCallback(() => {
    let Icon;
    switch (type) {
      case 'add':
        Icon = <AddIcon />;
      break;
      case 'list':
        Icon = <ViewListIcon />;
      break;
      case 'close':
        Icon = <CloseIcon />;
      break;
      case 'delete':
        Icon = <DeleteIcon />;
      break;
      case 'preview':
        Icon = <ChevronRightIcon />;
      break;
      case 'open-new':
        Icon = <OpenInNewIcon />;
      break;
    
    default:
      Icon = <AddIcon />;
    }

    return Icon;
  }, [type]);
  return (
    <MUIIconButton
      aria-label={type}
      onClick={onClick}
      color={color}
      className={className}
      size={size}
    >
      {getIcon()}
    </MUIIconButton>
  );
};


export default IconButton;