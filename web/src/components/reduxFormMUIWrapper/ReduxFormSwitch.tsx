import React, { ChangeEvent } from 'react';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';

type InputProps = {
	value: any;
	onChange: any;
};
type Props = {
	input: InputProps;
	meta: { error?: string };
};

const ReduxFormSwitch = ({ input: { value, onChange }, meta: { error } }: Props) => {
  const checked = value || false;

  const _onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.checked);
  };

  return (
    <div className="width100">
      <Switch 
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

export default ReduxFormSwitch;