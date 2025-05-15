import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FlightSearch } from './FlightSearch';
import { useFindFlights } from '@/hooks/useFindFlights';

jest.mock('../hooks/useFindFlights', () => ({
  useFindFlights: jest.fn(),
}));
const mockGetFilteredFlights = jest.fn();

const user = userEvent.setup();
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

  it('calls the filter function with the submitted data', async () => {
    render(<FlightSearch />);

    const originContainer = screen.getByTestId('input-origin');
    const originInput = within(originContainer).getByLabelText(
      'From'
    ) as HTMLInputElement;

    originContainer.focus();
    await user.type(originInput, 'AMS');

    fireEvent.keyDown(originContainer, { key: 'ArrowDown' });
    fireEvent.keyDown(originContainer, { key: 'Enter' });

    const destinationContainer = screen.getByTestId('input-destination');
    const destinationInput = within(destinationContainer).getByLabelText(
      'To'
    ) as HTMLInputElement;

    destinationContainer.focus();
    await user.type(destinationInput, 'MAD'); // Location code:FNC

    fireEvent.keyDown(destinationContainer, { key: 'ArrowDown' });
    fireEvent.keyDown(destinationContainer, { key: 'Enter' });

    const dateInput = screen.getByTestId('input-departureDate');
    fireEvent.change(dateInput, { target: { value: '2022-11-10' } });

    fireEvent.click(screen.getByTestId('search-button'));

    expect(mockGetFilteredFlights).toHaveBeenCalledTimes(1);
    expect(mockGetFilteredFlights).toHaveBeenCalledWith({
      origin: 'AMS',
      destination: 'FNC',
      departureDate: '2022-11-10',
    });
  });
});
