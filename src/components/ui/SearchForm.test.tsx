import React from 'react';
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from '@testing-library/react';

import { SearchForm } from './SearchForm';
import { useHandleSearchFlights } from '@/hooks/useHandleSearchFlights';

const mockSaveFormData = jest.fn();

jest.mock('../../hooks/useHandleSearchFlights', () => ({
  useHandleSearchFlights: jest.fn().mockImplementation(() => ({
    formData: {
      origin: '',
      destination: '',
      departureDate: '',
    },
    errors: {},
    handleInputChange: jest.fn(),
    handleInputClear: jest.fn(),
    handleSubmit: jest.fn(),
  })),
}));

describe('SearchForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders origin, destination, date, and buttons', () => {
    render(<SearchForm saveFormData={mockSaveFormData} />);

    expect(screen.getByTestId('input-origin')).toHaveTextContent('From');
    expect(screen.getByTestId('input-destination')).toHaveTextContent('To');
    expect(
      screen.getByTestId('input-departureDate-container')
    ).toHaveTextContent('Depart on');
    expect(screen.getByTestId('search-button')).toHaveTextContent('Search');
    expect(screen.getByTestId('clear-button')).toHaveTextContent('Clear');
  });

  it('calls handleInputChange with input value on change', async () => {
    const mockHandleChange = jest.fn();
    (useHandleSearchFlights as jest.Mock).mockReturnValue({
      formData: {
        origin: '',
        destination: 'MFN',
        departureDate: '10-11-2022',
      },
      errors: {},
      handleInputChange: mockHandleChange,
      handleInputClear: jest.fn(),
      handleSubmit: jest.fn(),
    });
    render(<SearchForm saveFormData={mockSaveFormData} />);

    const inputContainer = screen.getByTestId('input-origin');
    const input = within(inputContainer).getByLabelText(
      'From'
    ) as HTMLInputElement;

    inputContainer.focus();
    fireEvent.change(input, {
      target: { value: 'AMS' },
    });
    fireEvent.keyDown(inputContainer, { key: 'ArrowDown' });
    fireEvent.keyDown(inputContainer, { key: 'Enter' });

    await waitFor(() => expect(mockHandleChange).toHaveBeenCalledTimes(1));
    expect(mockHandleChange).toHaveBeenCalledWith('AMS', 'origin');
  });

  it('calls handleSubmit with formData on submit', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    (useHandleSearchFlights as jest.Mock).mockReturnValue({
      formData: {
        origin: 'AMS',
        destination: 'MFN',
        departureDate: '10-11-2022',
      },
      errors: {},
      handleInputChange: jest.fn(),
      handleInputClear: jest.fn(),
      handleSubmit: mockHandleSubmit,
    });

    render(<SearchForm saveFormData={mockSaveFormData} />);
    fireEvent.click(screen.getByTestId('search-button'));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it('calls handleInputClear when Clear button is clicked', () => {
    const mockClear = jest.fn();
    (useHandleSearchFlights as jest.Mock).mockReturnValue({
      formData: {
        origin: 'AMS',
        destination: 'LHR',
        departureDate: '2025-06-01',
      },
      errors: {},
      handleInputChange: jest.fn(),
      handleInputClear: mockClear,
      handleSubmit: jest.fn(),
    });

    render(<SearchForm saveFormData={mockSaveFormData} />);
    fireEvent.click(screen.getByTestId('clear-button'));

    expect(mockClear).toHaveBeenCalled();
  });

  it('shows error helper texts if there are validation errors', async () => {
    (useHandleSearchFlights as jest.Mock).mockReturnValue({
      formData: {
        origin: '',
        destination: '',
        departureDate: '',
      },
      errors: {
        origin: true,
        destination: true,
        departureDate: true,
      },
      handleInputChange: jest.fn(),
      handleInputClear: jest.fn(),
      handleSubmit: jest.fn((e) => e.preventDefault()),
    });

    render(<SearchForm saveFormData={mockSaveFormData} />);

    fireEvent.click(screen.getByTestId('search-button'));

    expect(await screen.findByText('Origin is required')).toBeInTheDocument();
    expect(screen.getByText('Destination is required')).toBeInTheDocument();
    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });
});
