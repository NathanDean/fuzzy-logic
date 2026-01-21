import AboutClientWrapper from '@/app/(main)/about/AboutClientWrapper';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { mockTeamMemberData } from '../__fixtures__/teamMember';

describe('AboutClientWrapper', () => {
  it('displays people after loading from Supabase', async () => {
    render(<AboutClientWrapper team={mockTeamMemberData} />);

    expect(screen.getByRole('heading', { name: 'Mark Corrigan' }));
    expect(screen.getByText('Boy to geek to drone.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jeremy Usborne' }));
    expect(screen.getByText('Big beats are the best.')).toBeInTheDocument();
  });
});
