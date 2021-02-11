import React, { ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

type InputProps = {
	value: any;
	onChange: any;
};
type Props = {
	input: InputProps;
	meta: { error?: string };
};

const ReduxFormCheckbox = ({ input: { value, onChange }, meta: { error } }: Props) => {

  const checked = value || false;

  const _onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <Checkbox 
        checked={checked}
        onChange={_onChange}
      />
      { error && (
        <FormHelperText error>
          { error }
        </FormHelperText>
      )	}
    </div>
  );
};

export default ReduxFormCheckbox;