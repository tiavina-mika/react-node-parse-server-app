import React, { ReactNode } from 'react';
import { v4 as uid } from 'uuid';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

type InputProps = {
	value: any;
	onChange: any;
};
type Props = {
	input: InputProps;
	meta: { error?: string };
	children: ReactNode;
	multiple?: any;
	readOnly?: boolean;
	renderValue?: any;
	[x: string]: any | null;
};

const ReduxFormSelect = ({
  input: { value, onChange },
  meta: { error },
  children, multiple, className,
  readOnly = false, renderValue,
  ...otherProps
}: Props) => {

  const selected = value || [];

  const _onChange = (event: any) => {
    onChange(event.target.value);
  };
  return (
    <div className="width100">
      <Select
        value={selected}
        onChange={_onChange}
        input={<Input id={'select_' + uid()} readOnly={readOnly} />}
        multiple={multiple}
        classes={{ select: className }}
        renderValue={renderValue}
        {...otherProps}
      >
        {children}
      </Select>
      {error && (
        <FormHelperText error>
          {error}
        </FormHelperText>
      )}
    </div>
  );
};

export default ReduxFormSelect;