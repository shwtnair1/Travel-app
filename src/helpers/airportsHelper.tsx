import airportsData from '../data/airports.json';

export const convertDataToMuiOptionsFormat = () => {
  return airportsData.Airports.map((airport) => ({
    label: airport.AirportName,
    id: airport.ItemName,
  }));
};
