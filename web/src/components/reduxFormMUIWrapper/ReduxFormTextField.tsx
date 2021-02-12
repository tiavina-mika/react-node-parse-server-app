import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

type InputProps = {
	name?: string;
	value: any;
	onChange: any;
};
type Props = {
	input: InputProps;
	meta: { error?: string; touched: any; };
	multiline?: boolean;
	rowsMax?: any;
	type?: any;
	placeholder?: string;
	fullWidth?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
};
const ReduxFormTextField = ({
  input: { name, value, onChange },
  meta: { error, touched },
  multiline = false, rowsMax,
  type = 'text',
  placeholder, fullWidth, readOnly, disabled,
}: Props) => {

  const text = value || '';
	
  const _onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <div className="width100">
      <TextField
        name={name}
        value={text}
        onChange={_onChange}
        multiline={multiline}
        rowsMax={multiline && rowsMax ? rowsMax : ''}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        inputProps={{
          readOnly,
        }}
        disabled={disabled}
      />
      { touched && error && (
        <FormHelperText error>
          { error }
        </FormHelperText>
      )	}
    </div>
  );
};

export default ReduxFormTextField;