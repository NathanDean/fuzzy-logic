import AboutClientWrapper from '@/app/(main)/about/AboutClientWrapper';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const mockPeopleData = [
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
];

describe('About', () => {
  it('displays people after loading from Supabase', async () => {
    render(<AboutClientWrapper people={mockPeopleData} />);

    expect(screen.getByRole('header', { name: 'Mark Corrigan' }));
    expect(screen.getByText('Boy to geek to drone')).toBeInTheDocument();
    expect(screen.getByRole('header', { name: 'Jeremy Usborne' }));
    expect(screen.getByText('Big beats are the best')).toBeInTheDocument();
  });
});
