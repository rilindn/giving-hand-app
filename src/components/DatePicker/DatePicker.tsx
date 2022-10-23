import { TextField } from '@mui/material';
import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import styles from './DatePicker.module.scss';
import { FieldErrors } from 'react-hook-form/dist/types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker: React.FC<Props> = ({ control, name, defaultValue = '', label, errors }) => {
  return (
    <div className={styles.main}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }: IController) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={styles.input}
              label={label}
              value={value}
              onChange={onChange}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
  errors?: FieldErrors | any;
}

interface IController {
  field: {
    onChange: (...event: any[]) => void;
    value: FieldPathValue<FieldValues, FieldPath<FieldValues>>;
  };
}

export default CustomDatePicker;
