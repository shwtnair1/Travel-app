import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';

import { FormField } from './FormField';

describe('FormField', () => {
  const options = [
    { label: 'Amsterdam', id: 'AMS' },
    { label: 'London', id: 'LHR' },
  ];

  const renderComponent = (
    value: string | undefined,
    onOptionSelect: jest.Mock,
    error: boolean = false
  ) =>
    render(
      <FormField
        options={options}
        value={value}
        onOptionSelect={onOptionSelect}
        label="Airport"
        error={error}
        name="airport"
      />
    );

  it('renders the Autocomplete with label', () => {
    renderComponent(undefined, jest.fn());
    expect(screen.getByLabelText('Airport')).toBeInTheDocument();
  });

  it('displays the selected value based on props', () => {
    renderComponent('LHR', jest.fn());
    const input = screen.getByRole('combobox') as HTMLInputElement;
    expect(input.value).toBe('London');
  });

  it('calls onOptionSelect when user selects a new option', () => {
    const onOptionSelect = jest.fn();
    renderComponent(undefined, onOptionSelect);

    const inputContainer = screen.getByTestId('input-airport');
    const input = within(inputContainer).getByLabelText(
      'Airport'
    ) as HTMLInputElement;

    inputContainer.focus();
    fireEvent.change(input, { target: { value: 'AMS' } });
    fireEvent.keyDown(inputContainer, { key: 'ArrowDown' });
    fireEvent.keyDown(inputContainer, { key: 'Enter' });

    expect(onOptionSelect).toHaveBeenCalledTimes(1);
    expect(onOptionSelect).toHaveBeenCalledWith(
      expect.any(Object),
      { id: 'AMS', label: 'Amsterdam' },
      expect.any(String),
      expect.any(Object)
    );
  });

  it('shows error outline in case of errors', () => {
    renderComponent('', jest.fn(), true);
    const inputContainer = screen.getByTestId('input-airport');
    const input = within(inputContainer).getByLabelText(
      'Airport'
    ) as HTMLInputElement;

    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});
