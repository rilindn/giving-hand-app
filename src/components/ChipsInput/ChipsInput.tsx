import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Control, Controller, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import styles from './ChipsInput.module.scss';
import { FieldErrors } from 'react-hook-form/dist/types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const MultipleSelectChip: React.FC<Props> = ({
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
        render={({ field: { onChange, value = [] } }: IController) => {
          return (
            <FormControl className={styles.input} margin={margin}>
              <InputLabel>{label}</InputLabel>
              <Select
                multiple
                value={value || []}
                onChange={onChange}
                input={<OutlinedInput label={label} />}
                renderValue={() => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {value.map((val: string) => (
                      <Chip key={val} label={val} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {options.map(({ label, value }: IOptions) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }}
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

export default MultipleSelectChip;
