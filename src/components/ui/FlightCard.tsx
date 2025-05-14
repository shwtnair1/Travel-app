import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import { FlightData } from '@/types/flight';

interface FlightCardProps {
  flightData: FlightData;
}

export const FlightCard = React.memo(
  ({ flightData }: FlightCardProps) => {
    return (
      <Card data-testid={`flight-card-${flightData.id}`}>
        <CardContent sx={{ height: '100%' }}>
          <Box
            display={'flex'}
            gap={5}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              data-testid={`card-content-airlines-${flightData.id}`}
            >
              <Typography variant="h6" color="text.secondary">
                {flightData.airlines}
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography variant="h5" component="div">
                <Stack direction={'row'} spacing={2}>
                  <Box display={'flex'} flexDirection={'column'}>
                    <span
                      data-testid={`card-content-departure-time-${flightData.id}`}
                    >
                      {flightData.departureTime}
                    </span>
                    <Typography
                      variant="body2"
                      data-testid={`card-content-origin-${flightData.id}`}
                    >
                      {flightData.origin}
                    </Typography>
                  </Box>
                  <span data-testid={`flight-takeoff-icon-${flightData.id}`}>
                    <FlightTakeoffIcon />
                  </span>
                  <Box display={'flex'} flexDirection={'column'}>
                    <span
                      data-testid={`card-content-arrival-time-${flightData.id}`}
                    >
                      {flightData.arrivalTime}
                    </span>
                    <Typography
                      variant="body2"
                      data-testid={`card-content-destination-${flightData.id}`}
                    >
                      {flightData.destination}
                    </Typography>
                  </Box>
                </Stack>
              </Typography>
            </Box>
            <Box
              display={'flex'}
              flex={1}
              flexDirection={'column'}
              borderLeft={'1px solid grey'}
              p={2}
              justifyContent={'center'}
              alignItems={'center'}
              gap={2}
              data-testid={`card-content-price-${flightData.id}`}
            >
              <Typography variant="body2" fontWeight={500} fontSize={24}>
                {flightData.price} {flightData.currency}
              </Typography>
              <Button variant="contained" sx={{ backgroundColor: '#00d66c' }}>
                Book Now
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  },
  (prevProps, nextProps) => prevProps.flightData.id === nextProps.flightData.id
);
