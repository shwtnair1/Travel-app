import { renderHook, act } from '@testing-library/react';
import { FormEvent } from 'react';

import { useHandleSearchFlights } from './useHandleSearchFlights';

describe('useHandleSearchFlights', () => {
  const setup = () => {
    const saveFormDataMock = jest.fn();
    const { result } = renderHook(() =>
      useHandleSearchFlights(saveFormDataMock)
    );
    return { result, saveFormDataMock };
  };

  it('should set errors if fields are empty on submit', () => {
    const { result } = setup();

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(fakeEvent);
    });

    expect(result.current.errors).toEqual({
      origin: true,
      destination: true,
      departureDate: true,
    });
  });

  it('should call saveFormData when form is valid', () => {
    const { result, saveFormDataMock } = setup();

    act(() => {
      result.current.handleInputChange('AMS', 'origin');
      result.current.handleInputChange('JFK', 'destination');
      result.current.handleInputChange('2025-06-01', 'departureDate');
    });

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as FormEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(fakeEvent);
    });

    expect(saveFormDataMock).toHaveBeenCalledWith({
      origin: 'AMS',
      destination: 'JFK',
      departureDate: '2025-06-01',
    });
    expect(result.current.errors).toEqual({
      origin: false,
      destination: false,
      departureDate: false,
    });
  });

  it('should update form value and clear error for field', () => {
    const { result } = setup();

    act(() => {
      result.current.handleInputChange('AMS', 'origin');
    });

    expect(result.current.formData.origin).toBe('AMS');
    expect(result.current.errors.origin).toBe(false);
  });

  it('should reset form data on clear', () => {
    const { result } = setup();

    act(() => {
      result.current.handleInputChange('AMS', 'origin');
      result.current.handleInputClear();
    });

    expect(result.current.formData).toEqual({
      origin: '',
      destination: '',
      departureDate: '',
    });
  });
});
