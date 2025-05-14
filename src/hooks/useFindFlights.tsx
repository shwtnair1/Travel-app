import { useCallback, useState } from 'react';

import { FlightData } from '@/types/flight';
import { FormData } from '@/types/flight';
import flightsData from '../data/flights-from-AMS.json';

export const useFindFlights = () => {
  const [availableFlights, setAvailableFlights] = useState<FlightData[]>([]);

  const getFilteredFlights = useCallback((formData: FormData) => {
    const availableFlights = flightsData.flightOffer
      .filter((flight) => {
        const flightDepartureDate = new Date(
          flight.outboundFlight.departureDateTime
        )
          .toISOString()
          .slice(0, 10);
        const userDepartureDate =
          formData.departureDate &&
          new Date(formData.departureDate).toISOString().slice(0, 10);

        return (
          flight.outboundFlight.departureAirport.locationCode ===
            formData.origin &&
          flight.outboundFlight.arrivalAirport.locationCode ===
            formData.destination &&
          flightDepartureDate === userDepartureDate
        );
      })
      .map((flight) => {
        const flightDepartureDateTime = new Date(
          flight.outboundFlight.departureDateTime
        );
        const flightArrivalDateTime = new Date(
          flight.outboundFlight.arrivalDateTime
        );
        return {
          departureTime: flightDepartureDateTime.toTimeString().slice(0, 5),
          arrivalTime: flightArrivalDateTime.toTimeString().slice(0, 5),
          price: flight.pricingInfoSum.totalPriceAllPassengers.toString(),
          currency: flight.pricingInfoSum.currencyCode,
          id: flight.outboundFlight.id,
          airlines: flight.outboundFlight.marketingAirline.companyShortName,
          origin: flight.outboundFlight.departureAirport.locationCode,
          destination: flight.outboundFlight.arrivalAirport.locationCode,
        };
      });
    setAvailableFlights(availableFlights);
  }, []);

  return {
    getFilteredFlights,
    availableFlights,
  };
};
