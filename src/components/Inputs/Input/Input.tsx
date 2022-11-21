import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FieldErrors } from 'react-hook-form/dist/types';
import clsx from 'clsx';

import styles from './Input.module.scss';

const CustomInput: React.FC<Props> = ({
  control,
  name,
  defaultValue = '',
  variant = 'outlined',
  margin = 'normal',
  type = 'text',
  errors,
  rounded,
  onEnter,
  ...props
}) => {
  return (
    <div className={styles.main}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: IController) => (
          <TextField
            className={clsx(styles.input, { [styles.rounded]: !!rounded })}
            value={value}
            onChange={onChange}
            variant={variant}
            margin={margin}
            type={type}
            onKeyPress={(e) => {
              if (onEnter && e.key === 'Enter') {
                onEnter(value);
              }
            }}
            {...props}
          />
        )}
      />
      {errors?.[name] && <span className={styles.error}>{errors?.[name]?.message}</span>}
    </div>
  );
};

interface Props {
  control: Control<any>;
  name: string;
  defaultValue?: string;
  label?: string;
  variant?: 'outlined' | 'standard' | 'filled' | undefined;
  margin?: 'normal' | 'dense' | 'none' | undefined;
  type?: string;
  errors?: FieldErrors | any;
  multiline?: boolean;
  rows?: number;
  rounded?: boolean;
  hiddenLabel?: boolean;
  InputProps?: InputProps;
  placeholder?: string;
  onEnter?: (val: string) => void;
}

interface InputProps {
  startAdornment: React.ReactNode;
}

interface IController {
  field: {
    onChange: (...event: any[]) => void;
    value: FieldPathValue<FieldValues, FieldPath<FieldValues>>;
  };
}

export default CustomInput;
