import { useRouter } from 'next/navigation';

import Account from '@/app/account/page';
import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Supabase client mock
jest.mock('@/utils/supabase/supabaseClient', () => ({
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({
      data: [
        {
          id: 'test-id',
          created_at: '2025-05-10 22:37:58.966912+00',
          workshop_id: 'test-workshop-id',
          user_id: 'test-user-id',
          status: 'confirmed',
          session_id: 'test-session-id',
          workshop: {
            id: 'test-workshop-id',
            created_at: '2025-05-09 22:37:58.966912+00',
            class_name: 'Intro to testing',
            date: '2025-06-04',
            start_time: '19:00:00',
            end_time: '22:00:00',
            venue: 'Test Theatre',
            price: 100,
            max_places_available: 12,
            description: 'Lorem ipsum',
          },
        },
      ],

      error: null,
    }),
  })),
}));

describe('Account', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects user to login page when not logged in', async () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    }));

    const mockRouter = { push: jest.fn() };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<Account />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('displays account page when user is logged in', async () => {
    const mockUser = {
      email: 'm.corrigan@jlb-credit.com',
      user_metadata: {
        first_name: 'Mark',
        last_name: 'Corrigan',
      },
    };

    (useAuth as jest.Mock).mockImplementation(() => ({
      isLoggedIn: true,
      isLoading: false,
      user: mockUser,
    }));

    const mockRouter = { push: jest.fn() };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<Account />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockRouter.push).not.toHaveBeenCalled();

    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Name: Mark Corrigan')).toBeInTheDocument();
    expect(
      screen.getByText('Email: m.corrigan@jlb-credit.com')
    ).toBeInTheDocument();
    expect(screen.getByText('Upcoming workshops:')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('shows loading ui while auth is loading', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isLoggedIn: false,
      isLoading: true,
      user: null,
    }));

    render(<Account />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
