import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders the FlightSearch page', () => {
    render(<Home />);

    expect(screen.getByTestId('search-page-container')).toBeInTheDocument();
  });
});
