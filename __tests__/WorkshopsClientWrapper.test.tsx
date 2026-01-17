import { createCheckoutSession } from '@/actions/stripe';
import WorkshopsClientWrapper from '@/app/(main)/workshops/WorkshopsClientWrapper';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { mockWorkshopsData } from '../__fixtures__/workshops';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { href: '' },
  });
});

// AuthContext mock
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: true,

    user: { id: 'test-user-id' },
  }),
}));

// Stripe createCheckoutSession mock
jest.mock('@/actions/stripe', () => ({
  createCheckoutSession: jest
    .fn()
    .mockResolvedValue({ url: 'https://stripe.com/checkout' }),
}));

const mockCreateCheckoutSession = jest.mocked(createCheckoutSession);

describe('Workshops', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays workshops correctly', async () => {
    render(<WorkshopsClientWrapper workshops={mockWorkshopsData} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Intro to Testing')).toBeInTheDocument();
    expect(screen.getByText('with Mark Corrigan')).toBeInTheDocument();
    expect(
      screen.getByText('Begins 6pm on Fri 16 Jan at Test Theatre')
    ).toBeInTheDocument();
    expect(screen.getByText('Advanced Testing')).toBeInTheDocument();
    expect(screen.getByText('with Alan Johnson')).toBeInTheDocument();
    expect(
      screen.getByText('Begins 6pm on Fri 16 Jan at The New Test Theatre')
    ).toBeInTheDocument();

    const bookingButton = screen.getAllByRole('button');
    expect(bookingButton).toHaveLength(2);

    const moreInfoLinks = screen.getAllByRole('link', { name: 'More info' });
    expect(moreInfoLinks).toHaveLength(2);
  });

  it('enables Book Now button when is_sold_out == false', async () => {
    render(<WorkshopsClientWrapper workshops={mockWorkshopsData} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByRole('button', { name: 'Book now' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Sold out' })).toBeDisabled();
  });

  it('calls createCheckoutSession with correct details when user clicks Book Now button', async () => {
    render(<WorkshopsClientWrapper workshops={mockWorkshopsData} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const bookNowButton = screen.getAllByRole('button', {
      name: 'Book now',
    })[0];

    await act(async () => {
      fireEvent.click(bookNowButton);
    });

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith('1', 'test-user-id');

    expect(window.location.href).toBe('https://stripe.com/checkout');
  });
});
