import { useSearchParams } from 'next/navigation';

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import LoginPage from '../src/app/(auth)/login/page';

const mockLogin = jest.fn();

jest.mock('@/utils/auth/actions', () => ({
  login: (formData: FormData) => {
    mockLogin(Object.fromEntries(formData));

    return Promise.resolve();
  },
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock - no search params
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  it('renders login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('renders conditional header when routed from workshop booking attempt', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn((param: string) => {
        if (param === 'redirectTo') return 'workshop';
        if (param === 'workshopId') return 'test-workshop-id';

        return null;
      }),
    });

    render(<LoginPage />);

    expect(
      screen.getByText('Please login to complete your booking')
    ).toBeInTheDocument();
  });

  it('submits form with correct values when clicking login', () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText('Email:'), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'TEST1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@test.com',
        password: 'TEST1234',
        'cf-turnstile-response': 'mock-turnstile-token',
      })
    );
  });
});
