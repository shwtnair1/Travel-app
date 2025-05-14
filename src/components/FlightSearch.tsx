'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { SearchForm } from './ui/SearchForm';
import { useFindFlights } from '@/hooks/useFindFlights';
import { FlightsList } from './ui/FlightsList';
import { FormData } from '@/types/flight';

import classes from './FlightSearch.module.css';

export const FlightSearch = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { getFilteredFlights, availableFlights } = useFindFlights();

  useEffect(() => {
    if (submittedData) getFilteredFlights(submittedData as FormData);
  }, [submittedData]);

  const saveFormData = useCallback((formData: FormData) => {
    setSubmittedData(formData);
  }, []);

  return (
    <>
      <Box
        className={classes.searchFormContainer}
        data-testid={'search-page-container'}
      >
        <Typography
          variant="h5"
          textAlign={'center'}
          data-testid={'search-card-title'}
          color="#00d66c"
        >
          Where do you want to go?
        </Typography>
        <SearchForm saveFormData={saveFormData} />
      </Box>
      <FlightsList availableFlights={availableFlights} />
    </>
  );
};
