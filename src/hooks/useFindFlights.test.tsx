import { renderHook, act } from '@testing-library/react';

import { useFindFlights } from './useFindFlights';

jest.mock('../data/flights-from-AMS.json', () => ({
  flightOffer: [
    {
      outboundFlight: {
        departureAirport: { locationCode: 'AMS' },
        arrivalAirport: { locationCode: 'JFK' },
        departureDateTime: '2025-06-01T10:00:00',
        arrivalDateTime: '2025-06-01T13:00:00',
        id: 'flight-1',
        marketingAirline: {
          companyShortName: 'KLM',
        },
      },
      pricingInfoSum: {
        totalPriceAllPassengers: 500,
        currencyCode: 'EUR',
      },
    },
  ],
}));

describe('useFindFlights', () => {
  it('should filter and return matching flight data', () => {
    const { result } = renderHook(() => useFindFlights());

    act(() => {
      result.current.getFilteredFlights({
        origin: 'AMS',
        destination: 'JFK',
        departureDate: '2025-06-01',
      });
    });

    expect(result.current.availableFlights).toEqual([
      {
        departureTime: '10:00',
        arrivalTime: '13:00',
        price: '500',
        currency: 'EUR',
        id: 'flight-1',
        airlines: 'KLM',
        origin: 'AMS',
        destination: 'JFK',
      },
    ]);
  });

  it('should return empty array when no flights match', () => {
    const { result } = renderHook(() => useFindFlights());

    act(() => {
      result.current.getFilteredFlights({
        origin: 'AMS',
        destination: 'LAX',
        departureDate: '2025-06-01',
      });
    });

    expect(result.current.availableFlights).toEqual([]);
  });
});
