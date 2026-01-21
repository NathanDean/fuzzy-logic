import About from '@/app/(main)/about/page';
import '@testing-library/jest-dom';

import { mockTeamMemberData } from '../__fixtures__/teamMember';

jest.mock('@/lib/supabase/serverClient', () => ({
  createClient: jest.fn(() => ({
    from: () => ({
      select: () => ({
        order: () =>
          Promise.resolve({
            data: mockTeamMemberData,
          }),
      }),
    }),
  })),
}));

describe('About', () => {
  it('passes correct people data to client wrapper', async () => {
    const component = await About();
    const clientWrapper = component.props.children;
    const team = clientWrapper.props.team;

    expect(team[0].name).toBe('Mark Corrigan');
    expect(team[0].bio).toBe('Boy to geek to drone.');
    expect(team[1].name).toBe('Jeremy Usborne');
    expect(team[1].bio).toBe('Big beats are the best.');
  });
});
