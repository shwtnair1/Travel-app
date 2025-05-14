import React from 'react';
import { render, screen } from '@testing-library/react';

import { FlightsList } from './FlightsList';
import { FlightData } from '@/types/flight';

const mockFlights: FlightData[] = [
  {
    id: 'FL1',
    origin: 'AMS',
    destination: 'LHR',
    departureTime: '08:00',
    arrivalTime: '09:00',
    price: '100',
    currency: 'EUR',
    airlines: 'KLM',
  },
  {
    id: 'FL2',
    origin: 'AMS',
    destination: 'CDG',
    departureTime: '10:00',
    arrivalTime: '11:20',
    price: '120',
    currency: 'EUR',
    airlines: 'Air France',
  },
];

describe('FlightsList', () => {
  it('renders the heading and FlightCard', () => {
    render(<FlightsList availableFlights={mockFlights} />);

    expect(screen.getByTestId('flight-list-title')).toHaveTextContent(
      'Available Flights'
    );
    expect(screen.getByTestId('flight-card-FL1')).toBeInTheDocument();
    expect(screen.getByTestId('card-content-airlines-FL1')).toHaveTextContent(
      mockFlights[0].airlines
    );
    expect(screen.getByTestId('flight-card-FL2')).toBeInTheDocument();
    expect(screen.getByTestId('card-content-airlines-FL2')).toHaveTextContent(
      mockFlights[1].airlines
    );
  });

  it('renders a message card when availableFlights is empty', () => {
    render(<FlightsList availableFlights={[]} />);

    expect(screen.getByTestId('flight-list-title')).toHaveTextContent(
      'Available Flights'
    );
    expect(screen.getByTestId('no-flights-card')).toHaveTextContent(
      'No flights available at the moment'
    );
    expect(screen.queryByTestId('flight-card-FL1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('flight-card-FL2')).not.toBeInTheDocument();
  });
});
