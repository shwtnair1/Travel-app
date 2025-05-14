import { convertDataToMuiOptionsFormat } from './airportsHelper';

jest.mock('../data/airports.json', () => ({
  Airports: [
    { AirportName: 'Amsterdam Schiphol Airport', ItemName: 'AMS' },
    {
      AirportName: 'John F. Kennedy International Airport',
      ItemName: 'JFK',
    },
  ],
}));

describe('convertDataToMuiOptionsFormat', () => {
  it('should convert airport data into MUI Autocomplete options format', () => {
    const result = convertDataToMuiOptionsFormat();

    expect(result).toEqual([
      { label: 'Amsterdam Schiphol Airport', id: 'AMS' },
      { label: 'John F. Kennedy International Airport', id: 'JFK' },
    ]);
  });
});
