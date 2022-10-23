import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';

import styles from './Select.module.scss';

const CustomSelect: React.FC<Props> = ({
  control,
  name,
  defaultValue = '',
  label,
  margin = 'normal',
  errors,
  options = []
}) => {
  return (
    <div className={styles.main}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: IController) => (
          <FormControl className={styles.input} margin={margin}>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={onChange}>
              {options?.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
  margin?: 'normal' | 'dense' | 'none' | undefined;
  errors?: FieldErrors | any;
  options: IOptions[];
}

interface IOptions {
  label: string;
  value: string;
}

interface IController {
  field: {
    onChange: (...event: any[]) => void;
    value: FieldPathValue<FieldValues, FieldPath<FieldValues>>;
  };
}

export default CustomSelect;
