import { createCheckoutSession } from '@/actions/stripe';
import WorkshopsClientWrapper from '@/app/(main)/workshops/WorkshopsClientWrapper';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';

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

const mockWorkshopsData = [
  {
    id: '1',
    created_at: '2025-04-01T12:00:00Z',
    class_name: 'Intro to Testing',
    teacher: 'Mark Corrigan',
    course_type: '2 week course, Saturday afternoons',
    date: new Date().toISOString().split('T')[0],
    start_time: '18:00:00',
    end_time: '21:00:00',
    venue: 'Test Theatre',
    price: 100,
    max_places_available: 12,
    description: 'A workshop about testing.',
    image_url: 'an_honourable_man.png',
    on_sale: true,
    bookings: [{ count: 10 }],
    places_remaining: 2,
  },
  {
    id: '2',
    created_at: '2025-04-01T12:00:00Z',
    class_name: 'Advanced Testing',
    teacher: 'Alan Johnson',
    course_type: '8 week course, Tuesday evenings',
    date: new Date().toISOString().split('T')[0],
    start_time: '18:00:00',
    end_time: '21:00:00',
    venue: 'The New Test Theatre',
    price: 100,
    max_places_available: 12,
    description: 'Slorem slipsum.',
    bookings: [{ count: 12 }],
    image_url: 'fwonkfort.jpg',
    on_sale: true,
    places_remaining: 0,
  },
];

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
      screen.getByText('Begins 6pm on Thu 15 Jan at Test Theatre')
    ).toBeInTheDocument();
    expect(screen.getByText('Advanced Testing')).toBeInTheDocument();
    expect(screen.getByText('with Alan Johnson')).toBeInTheDocument();
    expect(
      screen.getByText('Begins 6pm on Thu 15 Jan at The New Test Theatre')
    ).toBeInTheDocument();

    const bookingButton = screen.getAllByRole('button');
    expect(bookingButton).toHaveLength(2);

    const moreInfoLinks = screen.getAllByRole('link', { name: 'More info' });
    expect(moreInfoLinks).toHaveLength(2);
  });

  it('enables Book Now button when workshop.bookings < workshop.places_available', async () => {
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
