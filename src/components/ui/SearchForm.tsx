import React from 'react';
import { Button, Stack, TextField } from '@mui/material';

import { convertDataToMuiOptionsFormat } from '@/helpers/airportsHelper';
import { useHandleSearchFlights } from '@/hooks/useHandleSearchFlights';
import { FormData } from '@/types/flight';
import { FormField } from './FormField';

interface SearchFormProps {
  saveFormData: (formData: FormData) => void;
}

const airportOptions = convertDataToMuiOptionsFormat();

export const SearchForm = React.memo(({ saveFormData }: SearchFormProps) => {
  const {
    handleInputChange,
    handleInputClear,
    handleSubmit,
    formData,
    errors,
  } = useHandleSearchFlights(saveFormData);

  return (
    <form onSubmit={handleSubmit} data-testid="search-form">
      <Stack spacing={2}>
        <FormField
          label="From"
          placeholder="Origin airport"
          name="origin"
          value={formData.origin}
          error={errors.origin}
          onOptionSelect={(_, value) =>
            handleInputChange(value?.id || '', 'origin')
          }
          options={airportOptions}
          helperText={errors.origin && 'Origin is required'}
        />
        <FormField
          label="To"
          placeholder="Destination airport"
          name="destination"
          value={formData.destination}
          error={errors.destination}
          onOptionSelect={(_, value) =>
            handleInputChange(value?.id || '', 'destination')
          }
          options={airportOptions}
          helperText={errors.destination && 'Destination is required'}
        />
        <TextField
          type="date"
          label="Depart on"
          name="departureDate"
          error={errors.departureDate}
          helperText={errors.departureDate && 'Date is required'}
          value={formData.departureDate}
          onChange={(e) => handleInputChange(e.target.value, 'departureDate')}
          data-testid="input-departureDate-container"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              'data-testid': 'input-departureDate',
            },
          }}
          sx={{ width: '25%' }}
        />
        <Stack direction="row" spacing={2} justifyContent={'flex-end'}>
          <Button
            sx={{ backgroundColor: '#00d66c' }}
            type="submit"
            variant="contained"
            data-testid="search-button"
          >
            Search
          </Button>
          <Button
            sx={{ color: '#00d66c' }}
            onClick={handleInputClear}
            variant="text"
            data-testid="clear-button"
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </form>
  );
});
