import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

import { FlightData } from '@/types/flight';
import { FlightCard } from './FlightCard';

interface FlightsListProps {
  availableFlights: FlightData[];
}
export const FlightsList = React.memo(
  ({ availableFlights }: FlightsListProps) => {
    return (
      <Box gap={1} mt={2}>
        <Typography variant="h5" data-testid="flight-list-title">
          Available Flights
        </Typography>
        <Box mt={2}>
          {availableFlights.length > 0 ? (
            availableFlights.map((flight) => (
              <FlightCard key={flight.id} flightData={flight} />
            ))
          ) : (
            <Card
              sx={{ backgroundColor: 'grey.100' }}
              data-testid="no-flights-card"
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography
                  variant="h6"
                  component="div"
                  color={'text.secondary'}
                >
                  No flights available at the moment
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    );
  }
);
