import Select from 'react-select';

/* eslint-disable react/jsx-indent-props */
const customStyles = {
  container: (styles: any, state: any) => {
    const { selectProps: { width, fullWidth } } = state;

    return {
      ...styles,
      width: fullWidth ? '100%' : width,
      marginTop: 10,
    };
  },
  control: (styles: any, state: any) => {
    const { selectProps: { width, fullWidth }, isFocused } = state;
    return {
      ...styles,
      width: fullWidth ? '100%' : width,
      outline: isFocused ? '1px solid #fff' : 'none',
      border:  'none',
      borderRadius: 0,
      borderBottom: '1px solid #949494',
      ':hover': {
        outline: '1px solid #fff',
        borderBottom: '1px solid #949494',
      },
    };
  },
  menu: () => ({
    zIndex: 100,
  }),
  option: (styles: any, state: any) => ({
    ...styles,
    color: state.isSelected ? '#fff' : 'blue',
    padding: '14px 20px',
    	width: '100%',
  }),
  singleValue: (styles: any, state: any) => {
	  const opacity = state.isDisabled ? 0.5 : 1;
	  const transition = 'opacity 300ms';
  
	  return { ...styles, opacity, transition };
  },
  multiValue: (styles: any) => {
    return {
      ...styles,
      padding: '3px 5px 3px 8px',
      fontSize: 18,
    };
  },
  multiValueLabel: (styles: any) => ({
    ...styles,
  }),
  multiValueRemove: (styles: any) => ({
    ...styles,
    marginLeft: 8,
    ':hover': {
      opacity: 0.5,
      cursor: 'pointer',
    },
  }),
};

type Props = {
	input: any;
	options: any[];
	width?: number;
	fullWidth?: boolean;
	isMulti?: boolean;
	isClearable?: boolean;
	styles?: any;
	[x: string]: any | null;
};

const ReduxFormReactSelect = ({ 
  input,
  options,
  width,
  fullWidth,
  isMulti,
  isClearable,
  styles,
  ...otherProps 
}: Props) => {

  return (
    <Select 
      {...input}
      onChange={(value: string) => input.onChange(value)}
      onBlur={() => input.onBlur ? input.onBlur(input.value) : {}}
      options={options}
      styles={styles || customStyles}
      width={width}
      fullWidth={fullWidth}
      isMulti={isMulti}
      isClearable={isClearable}
      {...otherProps}
    />
  );
};

export default ReduxFormReactSelect;