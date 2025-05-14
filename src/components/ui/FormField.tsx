import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

interface FormFieldProps extends React.ComponentProps<typeof TextField> {
  options: { label: string; id: string }[];
  value: string | undefined;
  onOptionSelect: (
    event: React.SyntheticEvent,
    value: {
      label: string;
      id: string;
    } | null
  ) => void;
}

export const FormField = ({
  options,
  value,
  onOptionSelect,
  ...restInputProps
}: FormFieldProps) => {
  return (
    <Box data-testid={`combo-box-${restInputProps.name}`}>
      <Autocomplete
        disablePortal
        options={options}
        value={options.find((o) => o.id === value) || null}
        onChange={onOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            {...restInputProps}
            data-testid={`input-${restInputProps.name}`}
          />
        )}
      />
    </Box>
  );
};
