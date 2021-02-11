import React, { ReactNode } from 'react';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

/* eslint-disable @typescript-eslint/no-unused-expressions */
type InputProps = {
	value: any;
	onChange: any;
};
type Props = {
	input: InputProps;
	meta: { error?: string };
	children: ReactNode;
	className?: string;
};

const ReduxFormOptions = ({ input: { value, onChange }, meta: { error }, children, className }: Props) => {

  const optionValue = value || '';

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target as HTMLInputElement).value;
  };

  return (
    <div className="width100">
      <RadioGroup
        value={optionValue}
        onChange={_onChange}
        className={className}
      > 
        {children}
      </RadioGroup>
      { error && (
        <FormHelperText error>
          { error }
        </FormHelperText>
      )}
    </div>
  );
};

export default ReduxFormOptions;