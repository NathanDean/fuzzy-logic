import { createCheckoutSession } from '@/actions/stripe';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { mockWorkshopsData } from '../__fixtures__/workshops';
import WorkshopDetailsClientWrapper from '../src/app/(main)/workshops/[workshopId]/WorkshopDetailsClientWrapper';

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

describe('WorkshopDetailsClientWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays workshop with correct details', () => {
    render(<WorkshopDetailsClientWrapper workshop={mockWorkshopsData[0]} />);

    expect(screen.getByText('Intro to Testing')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'with Mark Corrigan' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: '2 week course, Saturday afternoons',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Begins 6pm on Fri 16 Jan at Test Theatre',
      })
    ).toBeInTheDocument();
    expect(screen.getByText('A workshop about testing.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Book now' })
    ).toBeInTheDocument();
  });

  it('calls createCheckoutSession with correct details when user clicks Book Now button', async () => {
    render(<WorkshopDetailsClientWrapper workshop={mockWorkshopsData[0]} />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const bookNowButton = screen.getAllByRole('button', {
      name: 'Book now',
    })[0];
    fireEvent.click(bookNowButton);

    expect(mockCreateCheckoutSession).toHaveBeenCalledWith('1', 'test-user-id');
  });
});
