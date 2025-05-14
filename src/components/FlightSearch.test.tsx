import { render, screen } from '@testing-library/react';

import { FlightSearch } from './FlightSearch';
import { useFindFlights } from '@/hooks/useFindFlights';

jest.mock('../hooks/useFindFlights', () => ({
  useFindFlights: jest.fn(),
}));

jest.mock('../data/airports.json', () => ({
  Airports: [
    { AirportName: 'Amsterdam Schiphol Airport', ItemName: 'AMS' },
    {
      AirportName: 'John F. Kennedy International Airport',
      ItemName: 'JFK',
    },
  ],
}));

const mockGetFilteredFlights = jest.fn();
const mockAvailableFlights = [
  {
    id: 'FL123',
    origin: 'Amsterdam',
    destination: 'London',
    departureTime: '09:30',
    arrivalTime: '10:30',
    price: 10,
    currency: 'EUR',
    airlines: 'KLM',
  },
  {
    id: 'FL456',
    origin: 'Berlin',
    destination: 'Paris',
    departureTime: '09:30',
    arrivalTime: '10:30',
    price: 10,
    currency: 'EUR',
    airlines: 'KLM',
  },
];

describe('FlightSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFindFlights as jest.Mock).mockReturnValue({
      getFilteredFlights: mockGetFilteredFlights,
      availableFlights: mockAvailableFlights,
    });
  });

  it('renders the search form and flights list', () => {
    render(<FlightSearch />);

    // Check if the SearchForm is rendered
    expect(screen.getByTestId('search-page-container')).toBeInTheDocument(); // Assuming `SearchForm` has a test id
    expect(screen.getByTestId('search-card-title')).toHaveTextContent(
      'Where do you want to go?'
    );
    expect(screen.getByTestId('search-form'));

    // Check if FlightsList is rendered with available flights
    expect(screen.getByTestId('flight-card-FL123')).toBeInTheDocument();
    expect(screen.getByTestId('flight-card-FL456')).toBeInTheDocument();
  });

  it('renders FlightsList with available flights after data is fetched', () => {
    render(<FlightSearch />);

    expect(screen.getByTestId('flight-card-FL123')).toBeInTheDocument();
    expect(screen.getByTestId('flight-card-FL456')).toBeInTheDocument();
  });
});
