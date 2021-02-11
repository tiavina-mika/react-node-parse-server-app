import React from 'react';
import { FormControl } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';

import ReduxFormReactSelect from '../reduxFormMUIWrapper/ReduxFormReactSelect';

type Props = {
	name: string,
	label: string,
	rootClassName?: string,
	labelClassName?: string,
	fullWidth?: boolean,
	width?: number,
	options?: any,
	onChange: any,
};

const FormSelect = ({
  options,
  onChange,
  fullWidth,
  width,
  name,
  label,
  rootClassName,
  labelClassName,
  ...otherProps
}: Props) => {

  return (
    <FormControl margin="normal" fullWidth={fullWidth} classes={{ root: rootClassName }}>
      <FormLabel classes={{ root: labelClassName }}>
        {label}
      </FormLabel>
      <ReduxFormReactSelect
        label={label}
        name={name}
        fullWidth={fullWidth}
        width={width}
        options={options}
        input={{ onChange }}
        {...otherProps}
      />
    </FormControl>
  );
};

export default FormSelect;