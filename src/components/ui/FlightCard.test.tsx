import React from 'react';
import { render, screen } from '@testing-library/react';

import { FlightData } from '@/types/flight';
import { FlightCard } from './FlightCard';

const mockFlightData: FlightData = {
  origin: 'AMS',
  destination: 'JFK',
  departureTime: '10:30',
  arrivalTime: '13:45',
  price: '499',
  id: 'FL123',
  currency: 'EUR',
  airlines: 'KLM Royal Dutch Airlines',
};

describe('FlightCard', () => {
  it('renders all flight details correctly', () => {
    render(<FlightCard flightData={mockFlightData} />);

    expect(screen.getByTestId('card-content-airlines-FL123')).toHaveTextContent(
      mockFlightData.airlines
    );
    expect(
      screen.getByTestId('card-content-departure-time-FL123')
    ).toHaveTextContent(mockFlightData.departureTime);
    expect(screen.getByTestId('card-content-origin-FL123')).toHaveTextContent(
      mockFlightData.origin
    );
    expect(
      screen.getByTestId('card-content-arrival-time-FL123')
    ).toHaveTextContent(mockFlightData.arrivalTime);
    expect(
      screen.getByTestId('card-content-destination-FL123')
    ).toHaveTextContent(mockFlightData.destination);
    expect(screen.getByTestId('card-content-price-FL123')).toHaveTextContent(
      `${mockFlightData.price} ${mockFlightData.currency}`
    );
    expect(screen.getByTestId('flight-takeoff-icon-FL123')).toBeInTheDocument();
  });
});
