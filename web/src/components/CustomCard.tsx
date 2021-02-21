import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: '45vw',
  },
  header: {
    width: '100%',
    padding: 20,
    borderBottom: grey[500],
    composes: 'flexRow center',
  },
  content: {
    composes: 'stretchSelf',
  },
  actions: {
    borderTop: grey[600],
    width: '100%',
    padding: '4px 10px',
    justifyContent: ({ actions }: any) => actions ? 'flex-start' : 'flex-end',
  },
  action: {
    marginTop: 0,
    marginLeft: 0,
  },
  buttons: {
    composes: 'flexRow flex1',
  },
  okBtn: {
    marginLeft: 10,
  },
  fullScreenContainer: {
    composes: 'flexColumn self flex1 stretchSelf',
    height: 'calc(100vh - 50px)',
  },
  fullScreenContent: {
    composes: 'flex1 overflowAuto',
    maxHeight: 'unset !important',
  },
  actionButtonLeft: {
    order: -1,
    marginRight: 20,
    marginLeft: 0,
  },
});

type Props = {
	elevation?: number;
	rootClassName?: string;
	title?: string;
	titleClassName?: string;
	content: ReactNode;
	otherHeaderActionButtons?: ReactNode;
	contentClassName?: string;
	withActionButtons?: boolean;
	actions?: ReactNode;
	actionClassName?: string;
	okAction?: any;
	cancelAction?: any;
	okLabel?: string;
	cancelLabel?: string;
	fullScreen?: boolean;
  onHeaderPrimaryClick?: () => void;
  headerPrimaryLabel?: string;
  okBtnClassName?: string;
  okBtnVariant?: 'text' | 'outlined' | 'contained' | undefined;
  actionButtonPosition?: 'left' | 'right',
};

const CustomCard = ({
  elevation = 3, rootClassName, fullScreen = false,
  title, titleClassName,
  content, contentClassName,
  okAction, okLabel = 'Valider',
  actions, cancelAction,
  otherHeaderActionButtons,
  withActionButtons,
  actionClassName,
  actionButtonPosition = 'right',
  cancelLabel = 'Annuler',
  onHeaderPrimaryClick,
  headerPrimaryLabel,
  okBtnClassName,
  okBtnVariant = 'contained',
}: Props) => {

  // styles
  const classes = useStyles({ actions });

  const dispatch = useDispatch();
  const _goHome = () => dispatch(push('/'));

  const actionItems: ReactNode = actions || (
    <div className={classes.buttons}>
      {cancelAction && (
        <Button color="secondary" onClick={cancelAction || _goHome}>
          {cancelLabel}
        </Button>
      )}

      {okAction && (
        <Button
          color="primary"
          onClick={okAction}
          variant={okBtnVariant}
          classes={{ root: clsx(classes.okBtn, okBtnClassName, actionButtonPosition && classes.actionButtonLeft) }}
        >
          {okLabel}
        </Button>
      )} 
    </div>
  );

  return (
    <Card
      elevation={elevation}
      classes={{
        root: clsx(
          classes.root,
          rootClassName, {
            [classes.fullScreenContainer]: fullScreen,
          }),
      }}
    >
      {/* ---- header ----*/}
      { title && (
        <CardHeader
          title={(
            <Typography variant='h5'>
              {title}
            </Typography>
          )}
          classes={{ root: clsx(classes.header, titleClassName), action: classes.action }}
          // action={actionHeaderButtons}
          action={(
            <>
              {onHeaderPrimaryClick && (
                <Button onClick={onHeaderPrimaryClick} color="primary" variant="contained">
                  {headerPrimaryLabel}
                </Button>
              )}
              {otherHeaderActionButtons && otherHeaderActionButtons}
            </>
          )}
        />
      )}

      {/* ---- content ----*/}
      <CardContent
        classes={{
          root: clsx(
            classes.content,
            contentClassName, {
              [classes.fullScreenContent]: fullScreen,
            },
          ),
        }}
      >
        {content}
      </CardContent>

      {/* ---- actions ----*/}
      { withActionButtons && (
        <CardActions
          classes={{ root: clsx(classes.actions, actionClassName) }}
        >
          {actionItems}
        </CardActions>
      )}
    </Card>
  );
};

export default CustomCard;