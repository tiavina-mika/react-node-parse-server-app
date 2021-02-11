import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'devextreme-react/button';

import ModalDialog from '../ModalDialog';

const useStyles = makeStyles({
  root: {
    composes: 'flexRow stretch center justifyCenter',
  },
  button: {
    border: 'none',
    backgroundColor: 'transparent',
  },
  fullHeight: {
    height: 50,
  },
});

type Props = {
	onPreview: any;
	onEdit: any;
	onDelete: any;
	item: any;
	openDialog?: boolean;
	label: any;
	fullHeight: boolean;
};
const TableButtonsAction = ({ 
  onPreview,
  onEdit,
  onDelete,
  item,
  openDialog,
  label,
  fullHeight = true, 
}: Props) => {

  // state
  const [open, setOpen] = useState<boolean>(false);

  // open local dialog
  const handleOpenDialog = useCallback(() => {
    setOpen(openDialog || false);
  }, [openDialog]);

  // styles
  const classes = useStyles();

  // preview action
  const handlePreview = ({ event }: any) => {
    event.stopPropagation();
    onPreview(item);
  };

  // close dialog
  const _closeDialog = () => setOpen(false);

  // delete action
  const handleDelete = () => {
    onDelete(item);
    _closeDialog();
  };

  // edit action
  const handleEdit = ({ event }: any) => {
    event.stopPropagation();
    onEdit(item);
  };

  // open dialog
  const onDialogOpen = ({ event }: any) => {
    event.stopPropagation();
    handleOpenDialog();
    setOpen(true);
  };

  return (
    <div className={clsx(classes.root, { [classes.fullHeight]: fullHeight })}>
      {onPreview && (
        <Button
          icon="movetofolder"
          onClick={handlePreview}
          className={classes.button}
        />
      )}
      {onEdit && (
        <Button
          icon="edit"
          onClick={handleEdit}
          className={classes.button}
        />
      )}
      {onDelete && (
        <Button
          icon="trash"
          onClick={onDialogOpen}
          className={classes.button}
        />
      )}

      {/* ----------------- Template Deletion Dialog ----------------- */}
      <ModalDialog
        title="Suppression"
        content={(
          <span>
Voulez-vous supprimer
            <b>
              {label}
            </b>
?
          </span>
        )}
        isVisible={open}
        onConfirm={handleDelete}
        onClose={_closeDialog}
      />
    </div>
  );
};

export default TableButtonsAction;