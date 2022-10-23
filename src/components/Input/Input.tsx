import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FieldErrors } from 'react-hook-form/dist/types';

import styles from './Input.module.scss';

const CustomInput: React.FC<Props> = ({
  control,
  name,
  defaultValue = '',
  label,
  variant = 'outlined',
  margin = 'normal',
  type = 'text',
  errors
}) => {
  return (
    <div className={styles.main}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: IController) => (
          <TextField
            className={styles.input}
            value={value}
            onChange={onChange}
            label={label}
            variant={variant}
            margin={margin}
            type={type}
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
}

interface IController {
  field: {
    onChange: (...event: any[]) => void;
    value: FieldPathValue<FieldValues, FieldPath<FieldValues>>;
  };
}

export default CustomInput;
