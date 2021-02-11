import React from 'react';

import { normalizeNumber, formatNumber } from '../../utils/utils';
import FormField from './FormField';

type Props = {
	name: string;
	label: string;
  [x:string]: any | null;

};
const NumberField = ({ name, label, ...otherProps }: Props) => {

  return (
    <FormField
      name={name}
      label={label}
      type='number'
      step='0'
      format={(value: any) => formatNumber(value)}
      normalize={(value: any) =>normalizeNumber(value)}
      {...otherProps}
    />
  );
};

export default NumberField;
