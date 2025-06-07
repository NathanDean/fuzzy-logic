import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import Teachers from '@/app/teachers/page';

jest.mock('@/utils/supabase/supabaseClient', () => ({
  from: jest.fn(() => ({
    select: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          created_at: '2025-04-01T12:00:00Z',
          image_url: 'mark-corrigan.jpeg',
          name: 'Mark Corrigan',
          bio: 'Boy to geek to drone',
        },
        {
          id: 1,
          created_at: '2025-04-01T12:00:00Z',
          image_url: 'jeremy-usborne.jpeg',
          name: 'Jeremy Usborne',
          bio: 'Big beats are the best',
        },
      ],

      error: null,
    }),
  })),
}));

describe('Workshops', () => {
  it('initially displays loading state', () => {
    render(<Teachers />);

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('displays workshops after loading from Supabase', async () => {
    render(<Teachers />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Mark Corrigan')).toBeInTheDocument();
    expect(screen.getByText('Boy to geek to drone')).toBeInTheDocument();
    expect(screen.getByText('Jeremy Usborne')).toBeInTheDocument();
    expect(screen.getByText('Big beats are the best')).toBeInTheDocument();
  });
});
