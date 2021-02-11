import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { Field } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

import ReduxFormTextField from '../reduxFormMUIWrapper/ReduxFormTextField';

const useStyles = makeStyles({
  subContentLabel: {
    marginLeft: 15,
  },
  subContentValue: {
    marginLeft: '-15px',
  },
});

type Props = {
  name: string;
  label: string;
  rootClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  containerClassName?: string;
  horizontal?: boolean; // row is already taken by material-ui's FormGroup
  fullWidth?: boolean;
  subContent?: boolean;
  component?: any;
  suffix?: string;
  children?: ReactNode;
  [x: string]: any | null;
};

const FormField = ({
  label,
  name,
  rootClassName,
  labelClassName,
  valueClassName,
  containerClassName,
  fullWidth,
  horizontal = false,
  subContent = false,
  component,
  suffix = '',
  children,
  ...otherProps
}: Props) => {
  // styles
  const classes = useStyles();

  const { type, step } = otherProps;
  useEffect(() => {
    if (type === 'number' && step) {
      // NOTE : step is not directly recognized into otherProps
      const currentInput = `input[name="${name}"]`;
      const inputEl = document.querySelector(currentInput);
      if (inputEl) {
        inputEl.setAttribute('step', step);
        inputEl.setAttribute('lang', 'en-150');
      }
    }
  }, [type, step, name]);

  const usedComponent = component || ReduxFormTextField;

  return (
    <FormControl margin="normal" fullWidth={fullWidth} classes={{ root: rootClassName }}>
      <div className={clsx(
        horizontal ? 'flexRow center' : 'flexColumn',
        subContent && classes.subContentLabel,
        containerClassName,
      )}
      >
        <FormLabel classes={{ root: labelClassName }}>
          {label}
        </FormLabel> 
        <Field
          name={name}
          label={label}
          fullWidth={fullWidth}
          component={usedComponent}
          {...otherProps}
          className={clsx(subContent && classes.subContentValue, valueClassName)}
          endAdornment={(
            <InputAdornment position="end">
              {suffix}
            </InputAdornment>
          )}
        >
          { children }
        </Field>
      </div>
    </FormControl>
  );
};

export default FormField;
